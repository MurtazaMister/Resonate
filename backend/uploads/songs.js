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
const auth = require('../middleware/auth.middleware');

router.use(auth);

const {storage_songs} = require('../utilities/store');

function init_songs(conn){

    console.log("Initializing song buckets");
    
    this.gridfsBucket_songs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'songs'
    });
    this.gfs_songs = Grid(conn.db,mongoose.mongo);
    this.gfs_songs.collection('songs')

    return [this.gridfsBucket_songs,this.gfs_songs]
}

const upload = multer({storage:storage_songs, fileFilter:function(req,file,callback){
    let ext = path.extname(file.originalname);
    if(ext.toLowerCase()!='.mp3' && ext.toLowerCase()!='.ogg' && ext.toLowerCase()!='.wav'){
        return callback(new Error('Only songs are allowed'));
    }
    callback(null, true);
}, limits:{fileSize: 10485760}}).single('song');

router.post('/upload', (req,res,next)=>{
    upload(req, res, (err)=>{
        if(res.req.file == undefined || err){
            res.json({
                "status": "fail",
                "error": "Invalid file or filesize"
            });
        }
        else{
            res.json({
                "status": "success",
                "id": res.req.file.id,
                "filename": res.req.file.filename,
            })
        }
    })
})

module.exports = {
    init_songs,
    song_router : router,
}