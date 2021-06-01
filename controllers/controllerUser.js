const ToDo = require('../models/toDo');

const User = require('../models/user')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


exports.userId = async function (req, res, next) {
    try {
        const product = await ToDo.find({})
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.userCreate = async function (req, res, next) {
    const {userName, password} = req.body;
    try {
        const user = await User.findOne({userName: userName})
        if (user) {
            return res.status(400)

        }
        const newUser = new User(
            {
                userName,
                password: await bcrypt.hash(password, 10)
            }
        );
        await newUser.save()
        return res.status(200).send();

    } catch (e) {
        return next(e)
    }
}

exports.getUser = async (req, res, next) => {
    const {userName, password} = req.query;
    try {
        const user = (await User.findOne({userName: userName}));
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!user) {
            return res.status(401).json('invalid username, fuck you')
        }
        if (isValidPassword) {
            const token = jwt.sign(user._id.toString(), process.env.KEY)
            return res.json({userName: user.userName, token: token})
        }
        return res.status(401).json('invalid token')
    } catch (e) {
        return next(e)
    }
}

exports.chekToken = async (req, res, next) => {
    const {token} = req.query;
    try {
        const payload = await jwt.verify(token, process.env.KEY)
        const user = await User.findById(payload)
        if (!user) {
            return res.status(401).json('invalid username, fuck you')
        }
        const newToken = jwt.sign(user._id.toString(), process.env.KEY)
        return res.json({userName: user.userName, token: newToken})
    } catch (e) {
        return next(e.name).status(400).json('error')
    }
}