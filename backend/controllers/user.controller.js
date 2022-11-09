const User = require('../models/user.model');
const mongoose = require('mongoose');

async function connectUser(req,res){
    try {
        let room = req.body.room;
        await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user)}, {$set:{room}});
        res.status(200).json({status:'success'})
    } catch (err) {
        res.status(400).json({status:'fail',error:err.message});
    }
}

async function disconnectUser(req,res){
    try {
        let data = await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user)}, {$set:{room:null}});
        res.status(200).json({status:'success'})
    } catch (err) {
        res.status(400).json({status:'fail',error:err.message});
    }
}

module.exports = {
    connectUser,
    disconnectUser,
}