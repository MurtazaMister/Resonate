const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const Music = require('../models/music.model');

// /api/music

// @route GET /
// @desc Getting all the music files
router.get('/')

// Recently Added - public - /public
// Your uploads - self uploaded songs - /self
// Your private collection - self uploaded private songs - /private
// All the artists - sorting artists wise - /artists

module.exports = router;