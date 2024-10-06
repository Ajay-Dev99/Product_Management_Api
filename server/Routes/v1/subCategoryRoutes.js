const { addsubcategory } = require("../../Controllers/subCategoryControllers");
const userAuth = require("../../Middlewares/userAuth");

const subcategoryRoutes = require("express").Router();

subcategoryRoutes.post("/addsubcategory", userAuth, addsubcategory);

module.exports = subcategoryRoutes;
