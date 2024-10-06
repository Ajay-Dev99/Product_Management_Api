const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    variants: [],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId, // References subcategory
      ref: "Subcategory",
    },
    description: { type: String },
    images: [],
  },
  { timestamps: true }
)

module.exports = new mongoose.model("Product", productSchema)
