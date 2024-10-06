const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId, // References subcategory
        ref: 'Subcategory'
    }]
});

 
module.exports = new mongoose.model('Category', categorySchema);
