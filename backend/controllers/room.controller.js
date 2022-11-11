const mongoose = require('mongoose');
const Room = require('../models/room.model');
const { disconnectUser } = require('./user.controller');

async function leave(req,res){
    let user_id = req.user._id;

    try {
        let room_id = await disconnectUser(req,res);
        if(room_id == null){
            return {
                status: 'success'
            }
        }
        let room = await Room.findById(mongoose.Types.ObjectId(room_id));
        if(user_id.toString() == room.master.toString()){
            room.master = room.slaves.splice(0,1)[0] || null;
        }
        else{
            room.slaves.splice(room.slaves.indexOf(mongoose.Types.ObjectId(user_id)),1);
        }
        if(!(--room.members)){
            room.status = 'Offline';
        }
        await Room.findByIdAndUpdate(room_id,room);
        return {
            status: 'success',
        }
    } catch (err) {
        throw Error(err.message);
    }
}

module.exports = {
    leave,
}