const { login, signup, logout } = require("../../Controllers/userControllers");

const userRouter = require("express").Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
