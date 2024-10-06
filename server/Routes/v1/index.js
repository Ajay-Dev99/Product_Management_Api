const categoryRoutes = require("./categoryRoutes")
const productRouter = require("./productRoutes")
const subcategoryRoutes = require("./subCategoryRoutes")
const userRouter = require("./userRoutes")
const wishlistRouter = require("./wishlistRoutes")

const v1Routes = require("express").Router()

v1Routes.use("/user", userRouter)
v1Routes.use("/category", categoryRoutes)
v1Routes.use("/subcategory", subcategoryRoutes)
v1Routes.use("/product", productRouter)
v1Routes.use("/wishlist", wishlistRouter)

module.exports = v1Routes
