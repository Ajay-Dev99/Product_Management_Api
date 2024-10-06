const {
  addProduct,
  listProducts,
  editProduct,
  searchProducts,
  filterProductsBySubcategory,
} = require("../../Controllers/productController")
const upload = require("../../Middlewares/fileUpload")
const userAuth = require("../../Middlewares/userAuth")

const productRouter = require("express").Router()

productRouter.post("/addproduct", userAuth, upload.array("images"), addProduct)
productRouter.get("/listproducts", userAuth, listProducts)
productRouter.put("/editproduct/:productId", userAuth, editProduct)
productRouter.get("/search", searchProducts)
productRouter.get("/filter", filterProductsBySubcategory)

module.exports = productRouter
