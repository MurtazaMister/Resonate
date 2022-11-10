const User = require('../models/user.model');
const mongoose = require('mongoose');

async function connectUser(req,res){
    try {
        let room = req.body.room;
        let user = await User.findById(mongoose.Types.ObjectId(req.user));
        if(user.room == null){
            await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user)}, {$set:{room:mongoose.Types.ObjectId(room)}});
            return {
                status:'success'
            }
            // res.status(200).json({status:'success'})
        }
        else{
            // res.status(400).json({status:'fail',error:'User already in a room'});
            return {
                status: 'fail',
                room: user.room,
            }
            throw Error('User already in a room');
        }
    } catch (err) {
        throw Error(err.message)
        // res.status(500).json({status:'fail',error:err.message});
    }
}

async function disconnectUser(req,res){
    try {
        let data = await User.findById(mongoose.Types.ObjectId(req.user)).select('room');
        if(data.room!=null){
            await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user)}, {$set:{room:null}});
            return data.room;
        }
        else{
            return null;
        }
        // res.status(200).json({status:'success'})
    } catch (err) {
        // res.status(400).json({status:'fail',error:err.message});
        throw Error(err.message);
    }
}

module.exports = {
    connectUser,
    disconnectUser,
}