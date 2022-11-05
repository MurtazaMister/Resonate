const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Music = require('../models/music.model');

router.post('/upload', async (req, res)=>{
    try {
        let music = {
            ...req.body,
            song: req.body.song,
            thumbnail: req.body.thumbnail,
            // userId: mongoose.Types.ObjectId("6365261zoo73m1835q479218"), // dummy
            // we will have a look at userId afterwards
        }
        music = new Music(music);
        await music.save();
        res.status(200).json({
            "status": "success",
        })
    } catch (err) {
        res.status(400).json({
            "status":"fail",
            "error": JSON.stringify(err),
        })
    }
});

module.exports = {
    music_router: router,
}