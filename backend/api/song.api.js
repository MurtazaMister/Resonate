const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();

// /api/song

// @route GET /:id
// @desc Getting a specific song
router.get('/:id', (req,res)=>{
    console.log(`In the route ${req.params.id}`);
    try {
        req.gfs_songs.files.findOne({
            _id: mongoose.Types.ObjectId(req.params.id),
        }, async (err, file)=>{
            console.log("Stage 1");
            if(!file){
                res.status(201).send('invalid');
                return;
            }
            
            console.log("Stage 2");
            const songSize = file.length;
            const range = req.headers.range;
            const start = Number((range)?range.replace(/\D/g, ""):0);
            const end = songSize - 1;
    
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${songSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "audio/mpeg",
                "Access-Control-Allow-Origin": '*',
            }
            
            console.log("Stage 3");
            res.writeHead(206, headers)
            console.log(res.getHeaders()['Access-Control-Allow-Origin']);
            console.log(res.getHeaders());
            
            console.log("Stage 4");
            const downloadStream = req.gridfsBucket_songs.openDownloadStreamByName(file.filename,{start,end});
            downloadStream.pipe(res);
            console.log("Stage 5");
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }
})

module.exports = router;