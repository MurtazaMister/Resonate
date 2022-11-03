const express = require('express')
const router = express.Router()

const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const { connect } = require("http2");

const storage = require('../utilities/store');

let gfs_songs;

function init_songs(conn){

    console.log("Initializing song buckets");
    
    gridfsBucket_songs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'songs'
    });
    gfs_songs = Grid(conn.db,mongoose.mongo);
    gfs_songs.collection('songs')

}

router.post('/upload', (req,res)=>{

    const upload = multer({storage, limits:{fileSize: 10485760}}).single('file');

    upload(req, res, (err)=>{
        if(!req.file || err){
            res.json({
                "status": "fail",
                "error": "Invalid file size"
            });
        }
        else{
            res.json({
                "status": "success",
            })
        }
    });
})

module.exports = {
    init_songs,
    song_router : router,
}