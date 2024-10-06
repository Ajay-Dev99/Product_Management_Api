const { login, signup, logout } = require("../../Controllers/userControllers")
const limiter = require("../../Middlewares/apilimiter")

const userRouter = require("express").Router()

userRouter.post("/signup", signup)
userRouter.post("/login", limiter, login)
userRouter.post("/logout", logout)

module.exports = userRouter
