const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')


// todo изменить на const
let UserSchema = new Schema({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = mongoose.model('User', UserSchema)
