const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, // References the parent Category
        ref: 'Category', 
        required: true
    }
});


module.exports = new mongoose.model('Subcategory', subcategorySchema);
