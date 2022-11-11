const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

require('dotenv').config();

const auth = async (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({status:"fail",error: 'Unauthorized access'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.secret);

        req.user = await User.findOne({_id}).select('_id');
        next();

    } catch (err) {
        res.status(401).json({status:"fail",error: 'Unauthorized access'})
    }

}

module.exports = auth;