const categoryDb = require("../Models/categoryModel")

const addCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: "Category Name required" })
    }

    const newCategory = new categoryDb({
      name,
    })

    const saved = await newCategory.save()
    if (saved) {
      res.status(200).json({ message: "CategoryCreated", saved })
    } else {
      res.status(400).json({ error: "Something went wrong" })
    }
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Category name already Exist" })
    }
    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const listCategories = async (req, res, next) => {
  try {
    const categoires = await categoryDb.find().populate("subcategories")
    if (!categoires) {
      return res.status(400).json({ error: "categories not found" })
    }
    return res.status(200).json(categoires)
  } catch (error) {
    console.log(error)

    return res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

module.exports = {
  addCategory,
  listCategories,
}
