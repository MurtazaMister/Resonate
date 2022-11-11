const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const Room = require('../models/room.model');
const User = require('../models/user.model');
const {connectUser, disconnectUser} = require('../controllers/user.controller');
const { leave } = require('../controllers/room.controller');

// /api/room

// @route GET /rooms
// @desc Get all the rooms
router.get('/', auth, async (req,res)=>{
    try {
        let rooms = await Room.find({});
        res.status(200).json({status:'success',rooms});
    } catch (err) {
        res.status(400).json({status:'fail', error:err.message});
    }
})

// @route POST /create
// @desc Creating a new room
router.post('/create', auth, async (req,res)=>{
    let roomObj = {
        roomname: req.body.roomname,
        thumbnail: req.body.thumbnail,
        master: mongoose.Types.ObjectId(req.user),
        slaves: [],
        music: {},
        queue: [],
        members: 1,
    }

    roomObj = new Room(roomObj);
    req.body.room = roomObj._id;
    try {
        let res_ans = await connectUser(req,res);

        if(res_ans?.status=='success'){
            await roomObj.save(async (err,doc)=>{
                if(err){
                    await disconnectUser(req,res);
                    res.status(400).json({status:"fail", error:err.message})
                }
            })
            res.status(200).json({status:'success',_id:roomObj._id,room:roomObj});
        }
        else{
            res.status(400).json({status:"fail", error:'User already in a room'})
        }
    } catch (err) {
        res.status(400).json({status:"fail", error:'User already in a room'})
    }
});

// @route PATCH /leave
// @desc Handling all the changes when a user leaves a room (updating room members, master and slaves and the status)
router.patch('/leave',auth, async (req,res)=>{
    try {
        let res_ans = await leave(req,res);
        if(res_ans.status == 'success'){
            res.status(200).json({status:'success'})
        }
        else{
            res.status(400).json({status:'fail'})
        }
    } catch (err) {
        res.status(400).json({status:'fail',error:err.message});
    }
})

// @route PATCH /:id
// @desc To handle joining of a room by any user, checking every condition that user is not a part of any other room and then updating the room status, members, master and slaves accordingly
router.patch('/:id',auth, async (req,res)=>{
    try {
        req.body.room = req.params.id;
        let room = await Room.findById(mongoose.Types.ObjectId(req.params.id));
        let res_ans = await connectUser(req,res);
        if(res_ans?.status=='success'){
            room.members++;
            room.status = 'Online';
            if(room.master == null){
                room.master = mongoose.Types.ObjectId(req.user);
            }
            else{
                room.slaves.push(mongoose.Types.ObjectId(req.user));
            }
            await Room.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),room);
            res.status(200).json({status:'success', room})
        }
        else{
            if(res_ans?.room.toString() == req.params.id){
                res.status(200).json({status:'success', room})
            }
            else{
                res.status(400).json({status:'fail'});
            }
        }
    } catch (err) {
        res.status(400).json({status:'fail',error:err.message});
    }
})

// @route PATCH /queue
// @desc To update the queue with the database
router.post('/queue', auth, async (req,res)=>{
    try {
        let {queue, roomId} = req.body;
        await Room.findByIdAndUpdate(roomId,{
            $set: {
                queue,
            }
        })
        res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
        })
    }
})


module.exports = router;