const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    text: {type: String, max: 100},
    isChecked:{type: Boolean, default: false},
});

module.exports = mongoose.model('Product', ProductSchema);
