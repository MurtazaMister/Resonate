const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomname: {type: String, required: true, maxLength:20, index: {unique: true}},
    master: {type: mongoose.Types.ObjectId, ref: 'users', required:true},
    slaves: {type: Array},
    music: {type:Object},
    queue: {type:Object},
    status: {type:String, enum: ['Online','Offline'], default: 'Online'},
    members: {type:Number},
},{
    timestamps: true,
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;