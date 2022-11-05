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

const {storage_images} = require('../utilities/store');

let gfs_images;

function init_images(conn){

    console.log("Initializing image buckets");
    
    gridfsBucket_images = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images'
    });
    gfs_images = Grid(conn.db,mongoose.mongo);
    gfs_images.collection('images')

}

const upload = multer({storage:storage_images, limits:{fileSize: 2097152}}).single('thumbnail');

router.post('/upload', (req,res)=>{
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
    });
})

module.exports = {
    init_images,
    image_router : router,
    gfs_images,
}