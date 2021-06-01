const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.tokenAccessForQuery = async function(req, res, next){
    const {token} = req.query;
    console.log('hgjgaskdfgasdjkgsjhgasldkhasd;fh', req.query)
    try{
        const user = await User.findById(jwt.verify(token, process.env.KEY))
        // console.log(jwt.verify(token,process.env.KEY));
        if(token===undefined || token===null){
            return res.status(401).send('token is undefined');
        }
        if(!user){
            return res.status(403).send('invalid token');
        }
        next()
    }catch(e){
        return next(e)
    }
}
