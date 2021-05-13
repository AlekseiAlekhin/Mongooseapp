const Product = require('../models/product.model');

const User = require('../models/product.userModel')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.getAllProducts = async function(req, res, next){
    try {
        const product = await Product.find({})
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.product_create = async function (req, res, next) {
    const {text} = req.body;

    try {
        const product = new Product(
            {
                text,
            }
        );
        await product.save()
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.product_update = async function (req, res, next) {
    const {isChecked} = req.body;

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {isChecked}, {new: true})
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.productUpdateAll = async function(req, res, next){
    const {isChecked} = req.body;
    try {
        const product = await Product.updateMany({},{isChecked}, {new: true})
        return res.json(product);
    }catch (e){
        return next(e)
    }
}

exports.product_delete = function(req,res,next){
    Product.findByIdAndRemove(req.params.id)
        .then(()=>{
            return res.send('Deleted successfully!');
        })
        .catch((err)=>next(err))
}

exports.productDeleteAll = async function(req,res,next){
    try{
        const product = await Product.deleteMany({isChecked: true})
        return res.send('Deleted successfully!')
    }catch (e){
        return next(e);
    }
}

exports.userId = async function(req, res, next){
    try {
        const product = await Product.find({})
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.userCreate = async function(req, res, next){
    const {userName, password} = req.body;
    try {
        if(!(await User.findOne({userName: userName}))){
        const user = new User(
            {
                userName,
                password: await bcrypt.hash(password, 10)
            }
        );
        await user.save()
        return res.json('nice')
        }return res.json('уже есть, все хуйня, давай еще раз')
    } catch (e) {
        return next(e)
    }
}

exports.getUser = async function(req, res, next){
    const {userName, password} = req.body;
    try {
        const user = await User.findOne({userName: userName})
        if(user === null){
            return res.status(400).json('invalid username, fuck you')
        }
        if( await bcrypt.compare(password, user.password)){
            return res.json(jwt.sign(user.password,'shhhg'))
        }
        return res.status(403).json('invalid token')
    } catch (e) {
        return next(e)
    }
}

