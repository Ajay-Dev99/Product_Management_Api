const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")

module.exports = async (req, res, next) => {
  try {
    const authToken = req.cookies.token

    if (!authToken) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." })
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRETE_KEY)

    const user = await userModel.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ error: "User not found." })
    }
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid token." })
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired." })
    } else {
      return res.status(500).json({ error: "Internal Server Error." })
    }
  }
}
