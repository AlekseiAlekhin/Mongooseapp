const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')

let UserSchema = new Schema({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    toDos:{type: Array, default: []}.min(3)
        .max(30),
})
//Hello nigger
module.exports = mongoose.model('User', UserSchema)