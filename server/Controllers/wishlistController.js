const WishlistDb = require("../Models/wishlistModel")

const addToWishlist = async (req, res) => {
  const { productId } = req.params
  const userId = req.user._id

  try {
    let wishlist = await WishlistDb.findOne({ userId })

    if (!wishlist) {
      wishlist = new WishlistDb({ userId, products: [{ productId }] })
    } else {
      if (
        wishlist.products.find(
          (item) => item.productId.toString() === productId
        )
      ) {
        return res.status(400).json({ error: "Product already in wishlist" })
      }
      wishlist.products.push({ productId })
    }

    await wishlist.save()
    return res
      .status(201)
      .json({ message: "Product added to wishlist", wishlist })
  } catch (error) {
    console.log(error)
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const removeFromWishlist = async (req, res) => {
  const { productId } = req.params
  const userId = req.user._id

  try {
    const wishlist = await WishlistDb.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    )

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" })
    }

    return res
      .status(200)
      .json({ message: "Product removed from wishlist", wishlist })
  } catch (error) {
    console.log(error)
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const getWishlist = async (req, res) => {
  const userId = req.user._id

  try {
    const wishlist = await WishlistDb.findOne({ userId }).populate({
      path: "products.productId",
      populate: [
        { path: "categoryId", select: "name" },
        { path: "subcategoryId", select: "name" },
      ],
    })

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" })
    }

    return res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
}
