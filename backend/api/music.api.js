const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const Music = require('../models/music.model');

// /api/music

// @route GET /public
// @desc Getting all the public music files
router.get('/public', async (req,res)=>{

    let limitObj = {};

    if(req.query.limit && parseInt(req.query.limit)){
        limitObj = {
            "$limit":parseInt(req.query.limit) 
        }
    }
    else{
        limitObj = {
            "$match": {}
        }
    }

    try {
        let music = await Music.aggregate([
            {
                $match: {
                    isPublic: true,
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                }
            },
            limitObj,
            {
                $project: {
                    _id: 0,
                    thumbnail: 1,
                    title: 1,
                    artists: 1,
                    isAnonymous: 1,
                    userId: 1,
                    song: 1,
                    duration: 1,
                }
            },
        ])
        res.status(201).json(music);
    } catch (err) {
        res.status(501).json([{
            artists: "Refresh the page",
            duration: "--:--",
            isAnonymous: true,
            title: "Server error",
        }])
    }
})

// @route GET /self
// @desc Getting all the songs uploaded by the user whether private or public
router.get('/self', auth, async (req,res)=>{
    let limitObj = {};

    if(req.query.limit && parseInt(req.query.limit)){
        limitObj = {
            "$limit":parseInt(req.query.limit) 
        }
    }
    else{
        limitObj = {
            "$match": {}
        }
    }

    try {
        let music = await Music.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(req.user),
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                }
            },
            limitObj,
            {
                $project: {
                    _id: 0,
                    thumbnail: 1,
                    title: 1,
                    artists: 1,
                    isAnonymous: 1,
                    userId: 1,
                    song: 1,
                    duration: 1,
                }
            },
        ])
        res.status(201).json(music);
    } catch (err) {
        res.status(501).json([{
            artists: "Refresh the page",
            duration: "--:--",
            isAnonymous: true,
            title: "Server error",
        }])
    }
})

// @route GET /private
// @desc Getting all the private songs of a user
router.get('/private',auth, async (req,res)=>{
    let limitObj = {};

    if(req.query.limit && parseInt(req.query.limit)){
        limitObj = {
            "$limit":parseInt(req.query.limit) 
        }
    }
    else{
        limitObj = {
            "$match": {}
        }
    }

    try {
        let music = await Music.aggregate([
            {
                $match: {
                    isPublic: false,
                    userId: mongoose.Types.ObjectId(req.user),
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                }
            },
            limitObj,
            {
                $project: {
                    _id: 0,
                    thumbnail: 1,
                    title: 1,
                    artists: 1,
                    isAnonymous: 1,
                    userId: 1,
                    song: 1,
                    duration: 1,
                }
            },
        ])
        res.status(201).json(music);
    } catch (err) {
        res.status(501).json([{
            artists: "Refresh the page",
            duration: "--:--",
            isAnonymous: true,
            title: "Server error",
        }])
    }
})

// @route GET /artists
// @desc Groups and returns songs artists wise
router.get('/artists',auth, async (req,res)=>{
    let limitObj = {};

    if(req.query.limit && parseInt(req.query.limit)){
        limitObj = {"songs": {
            "$slice": ["$songs",parseInt(req.query.limit)]
        }}
    }
    else{
        limitObj = {"songs": 1}
    }

    try {
        let music = await Music.aggregate([
            {
                $match: {
                    isPublic: true,
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                }
            },
            {
                $project: {
                    _id: 0,
                    thumbnail: 1,
                    title: 1,
                    artists: 1,
                    isAnonymous: 1,
                    userId: 1,
                    song: 1,
                    duration: 1,
                    updatedAt: 1,
                }
            },
            {
                $group: {
                    _id: {
                        $split: [{$toLower:"$artists"},","]
                    },
                    songs: {
                        $push: {
                            thumbnail: "$thumbnail",
                            title: "$title",
                            artists: "$artists",
                            isAnonymous: "$isAnonymous",
                            userId: "$userId",
                            song: "$song",
                            duration: "$duration",
                            updatedAt: "$updatedAt"
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$_id",
                }
            },
            {
                $unwind: {
                    path: "$songs",
                }
            },
            {
                $sort: {
                    "songs.updatedAt" : -1,
                }
            },
            {
                $group: {
                    _id: {
                        $trim: {
                            input: "$_id"
                        }
                    },
                    songs: {
                        $push: "$songs",
                    }
                }
            },
            {
                $project: {
                    _id:0,
                    'artists':"$_id",
                    ...limitObj,
                }
            }
        ])
        res.status(201).json(music);
    } catch (err) {
        res.status(501).json([{
            artists: "Refresh the page",
            duration: "--:--",
            isAnonymous: true,
            title: "Server error",
        }])
    }

})

module.exports = router;