const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const Room = require('../models/room.model');
const User = require('../models/user.model');
const {connectUser} = require('../controllers/user.controller');

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
        master: mongoose.Types.ObjectId(req.user),
        slaves: [],
        music: {},
        queue: [],
        members: 1,
    }

    roomObj = new Room(roomObj);
    await roomObj.save((err,doc)=>{
        if(!err){
            req.body.room = roomObj._id;
            connectUser(req,res);
        }
        else{
            res.status(400).json({status:"fail", err:err.message})
        }
    })
})

module.exports = router;