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

const {storage_images} = require('../utilities/store');

function init_images(conn){

    console.log("Initializing image buckets");
    
    this.gridfsBucket_images = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images'
    });
    this.gfs_images = Grid(conn.db,mongoose.mongo);
    this.gfs_images.collection('images')

    return [this.gridfsBucket_images,this.gfs_images];
}

const upload = multer({storage:storage_images, fileFilter:function(req,file,callback){
    let ext = path.extname(file.originalname);
    if(ext.toLowerCase()!='.png' && ext.toLowerCase()!='.jpg' && ext.toLowerCase()!='.jpeg' && ext.toLowerCase()!='.gif'){
        return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
}, limits:{fileSize: 2097152}}).single('thumbnail');

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
}