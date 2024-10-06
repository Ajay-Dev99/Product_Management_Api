const { default: mongoose } = require("mongoose")
const productDb = require("../Models/productModel")
const uploadToCloudinary = require("../Utilities/imageUpload")

const addProduct = async (req, res, next) => {
  try {
    const { title, variants, categoryId, subcategoryId, description } = req.body

    if (!title || !variants || !categoryId || !subcategoryId || !description) {
      return res.status(400).json({ error: "All fields are required" })
    }
    const files = req.files
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images provided" })
    }
    const alreadyExist = await productDb.findOne({ title })
    if (alreadyExist) {
      return res.status(400).json({ error: "Product Name already exist" })
    }

    const uploadPromises = files.map((file) => uploadToCloudinary(file.path))

    const uploadedImageUrls = await Promise.all(uploadPromises)

    const newProduct = new productDb({
      title,
      variants: JSON.parse(variants),
      categoryId,
      subcategoryId,
      description,
      images: uploadedImageUrls,
    })

    const saved = await newProduct.save()
    if (!saved) {
      return res.status(400).json({ error: "something went wrong" })
    }
    return res
      .status(200)
      .json({ message: "Product Added successfully", saved })
  } catch (error) {
    console.log(error)

    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const listProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit

    const totalProducts = await productDb.countDocuments()

    const products = await productDb
      .find()
      .populate("categoryId", "name")
      .populate("subcategoryId", "name")
      .skip(skip)
      .limit(limit)

    console.log(products)
    if (products.length === 0) {
      return res.status(400).json({ error: "No Products found" })
    }
    const totalPages = Math.ceil(totalProducts / limit)

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalProducts,
      products,
    })
  } catch (error) {
    console.log(error)

    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const { title, variants, categoryId, subcategoryId, description, images } =
      req.body

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" })
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error:
          "Invalid request: No data provided. Please ensure that the request body contains the necessary information.",
      })
    }

    const product = await productDb.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    product.title = title || product.title
    product.variants = variants || product.variants
    product.categoryId = categoryId || product.categoryId
    product.subcategoryId = subcategoryId || product.subcategoryId
    product.description = description || product.description
    product.images = images || product.images

    const updatedProduct = await product.save()

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const searchProducts = async (req, res) => {
  const { name } = req.query

  if (!name) {
    return res.status(400).json({ error: "Search term is required" })
  }

  try {
    const products = await productDb
      .find({
        title: { $regex: name, $options: "i" },
      })
      .populate("categoryId", "name")
      .populate("subcategoryId", "name")

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" })
    }

    return res.status(200).json(products)
  } catch (error) {
    console.error(error)
    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const filterProductsBySubcategory = async (req, res) => {
  const { subcategoryId } = req.query

  if (!subcategoryId || !mongoose.isValidObjectId(subcategoryId)) {
    return res.status(400).json({ error: "A valid subcategory ID is required" })
  }

  try {
    const products = await productDb
      .find({ subcategoryId })
      .populate("categoryId", "name")
      .populate("subcategoryId", "name")

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this subcategory" })
    }

    return res.status(200).json(products)
  } catch (error) {
    console.error(error)
    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

module.exports = {
  addProduct,
  listProducts,
  editProduct,
  searchProducts,
  filterProductsBySubcategory,
}
