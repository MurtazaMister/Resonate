const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const Music = require('../models/music.model');

// /api/music

// @route GET /public
// @desc Getting all the public music files
router.get('/public', async (req,res)=>{
    try {
        let music = await Music.aggregate([
            {
                $match: {
                    isPublic: true,
                },
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

// Your uploads - self uploaded songs - /self
// Your private collection - self uploaded private songs - /private
// All the artists - sorting artists wise - /artists

module.exports = router;