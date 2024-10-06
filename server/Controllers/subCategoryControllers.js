const mongoose = require("mongoose");
const categoryDb = require("../Models/categoryModel");
const subCategoryDb = require("../Models/subCategoryModel");

const addsubcategory = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;

       
        if (!name || !categoryId) {
            return res.status(400).json({ error: "All fields are required" });
        }

      
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: "categoryId is not valid" });
        }

      
        const [category, alreadyExist] = await Promise.all([
            categoryDb.findById(categoryId),
            subCategoryDb.findOne({ name, categoryId }),
        ]);
        

      
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

       
        if (alreadyExist) {
            return res.status(400).json({ error: "Subcategory already exists" });
        }

       
        const newSubcategory = new subCategoryDb({ name, categoryId });
        const savedSubcategory = await newSubcategory.save();

      
        category.subcategories.push(savedSubcategory._id);
        await category.save();

    
        return res.status(201).json({
            message: "Subcategory added successfully",
            subcategory: savedSubcategory,
            category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

module.exports = {
    addsubcategory
};
