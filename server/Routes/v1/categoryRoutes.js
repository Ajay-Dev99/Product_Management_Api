const {
  addCategory,
  listCategories,
} = require("../../Controllers/categoryControllers");
const userAuth = require("../../Middlewares/userAuth");

const categoryRoutes = require("express").Router();

categoryRoutes.post("/addcategory", userAuth, addCategory);
categoryRoutes.get("/listcategories", listCategories);

module.exports = categoryRoutes;
