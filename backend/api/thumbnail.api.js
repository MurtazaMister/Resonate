const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();

// /api/thumbnail

// @route GET /:id
// @desc Getting a specific thumbnail
router.get('/:id', (req,res)=>{
    req.gfs_images.files.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
    }, async (err, file)=>{
        if(!file){
            res.status(201).send('invalid');
            return;
        }
        const downloadStream = req.gridfsBucket_images.openDownloadStreamByName(file.filename);
        downloadStream.pipe(res);
        return;
    })
})

module.exports = router;