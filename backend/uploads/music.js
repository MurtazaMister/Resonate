const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Music = require('../models/music.model');
const auth = require('../middleware/auth.middleware');

router.use(auth);

router.post('/upload', async (req, res)=>{
    try {
        let music = {
            ...req.body,
            userId: req.user,
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