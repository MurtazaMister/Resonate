const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user.model');
const generateToken = require('../utilities/token');
const auth = require('../middleware/auth.middleware');
const {connectUser, disconnectUser} = require('../controllers/user.controller');

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

// @route PATCH /connect
// @desc Connecting the user to a room
router.patch('/connect', auth, async (req,res)=>{
    try {
        let res_ans = await connectUser(req,res);
        if(res_ans?.status == 'success'){
            res.status(200).json({status:'success'})
        }
        else{
            res.status(400).json({status:'fail', error:'User is already in a room'})
        }
    } catch (err) {
        res.status(400).json({status:'fail',error:err.message});
    }
});

// @route PATCH /disconnect
// @desc When a user logs out, he/she should be disconnected from the room too, if they are in any
router.patch('/disconnect',auth, async (req,res)=>{
    try {
        await disconnectUser(req,res);
        res.status(200).json({status:'success'})
    } catch (err) {
        res.status(400).json({status:'fail',error:err.message});
    }
});

module.exports = router;