const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../../Controllers/wishlistController")
const userAuth = require("../../Middlewares/userAuth")

const wishlistRouter = require("express").Router()

wishlistRouter.post("/add/:productId", userAuth, addToWishlist)
wishlistRouter.delete("/remove/:productId", userAuth, removeFromWishlist)
wishlistRouter.get("/list", userAuth, getWishlist)

module.exports = wishlistRouter
