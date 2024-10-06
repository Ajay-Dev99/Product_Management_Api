const cloudinary = require("../config/cloudinaryconfig")

const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: "Products" },
      (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      }
    )
  })
}

module.exports = uploadToCloudinary
