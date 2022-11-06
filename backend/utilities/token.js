const jwt = require('jsonwebtoken');

require("dotenv").config();

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.secret, {expiresIn: '3d'});
}

module.exports = generateToken;