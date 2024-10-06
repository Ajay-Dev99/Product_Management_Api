const userDb = require("../Models/userModel")
const { createToken } = require("../Utilities/GenerateToken")
const {
  hashPassword,
  comparePassword,
} = require("../Utilities/PasswordUtilities")

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (confirmpassword !== password) {
      return res.status(400).json({ error: "Passwords not match" })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = new userDb({
      name,
      email,
      password: hashedPassword,
    })

    const saved = await newUser.save()

    if (saved) {
      const token = createToken(saved._id)
      res.cookie("token", token)
      return res
        .status(200)
        .json({ message: "user accout created successfully" })
    } else {
      return res.status(400).json({ error: "something went wrong" })
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "User Already Exist" })
    }
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const userExist = await userDb.findOne({ email })

    if (!userExist) {
      return res.status(400).json({ error: "User Not found" })
    }

    const passwordMatch = await comparePassword(password, userExist.password)
    if (passwordMatch) {
      const token = createToken(userExist._id)
      res.cookie("token", token)
      res.status(200).json({ message: "Login successfuly", userExist })
    } else {
      res.status(401).json({ error: "Password not match" })
    }
  } catch (error) {
    console.log(error)
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

const logout = (req, res, next) => {
  try {
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out" })
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" })
  }
}

module.exports = {
  signup,
  login,
  logout,
}
