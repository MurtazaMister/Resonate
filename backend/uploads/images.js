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

let gfs_images;

function init_images(conn){

    console.log("Initializing image buckets");
    
    gridfsBucket_images = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images'
    });
    gfs_images = Grid(conn.db,mongoose.mongo);
    gfs_images.collection('images')

}

router.post('/upload', (req,res)=>{

})

module.exports = {
    init_images,
    image_router : router,
}