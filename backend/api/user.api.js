const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user.model');
const generateToken = require('../utilities/token');

// /api/user

// @route POST /signup
// @desc Used for signing up the user and returning a token
router.post('/signup',async (req,res)=>{
    const {email,password,username,first_name,last_name} = req.body;

    try {
        const user = await User.signup(username,password,first_name,last_name,email);

        // generating a token
        const token = generateToken(user._id);

        res.status(200).json({username,token});
    } catch (err) {
        res.status(400).json({error:err.message});
    }
});

// @route POST /login
// @desc Used for logging users in and returning a token
router.post('/login',async (req,res)=>{
    const {username, password} = req.body;

    try {
        const user = await User.login(username,password);

        // generating a token
        const token = generateToken(user._id);

        return res.status(200).json({username,token});
    } catch (err) {
        res.status(400).json({error:err.message});
    }
})

module.exports = router;