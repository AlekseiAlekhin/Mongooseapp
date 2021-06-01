const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    text: {type: String, max: 100},
    isChecked:{type: Boolean, default: false},
    userName:{type:String, max: 100},
});

module.exports = mongoose.model('ToDo', toDoSchema);
