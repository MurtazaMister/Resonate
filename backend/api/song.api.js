const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();

// /api/song

// @route GET /:id
// @desc Getting a specific song
router.get('/:id', (req,res)=>{
    req.gfs_songs.files.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
    }, async (err, file)=>{
        if(!file){
            res.status(201).send('invalid');
            return;
        }

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

        console.log({songSize, range, start, end, contentLength, headers});

        res.writeHead(206, headers)

        const downloadStream = req.gridfsBucket_songs.openDownloadStreamByName(file.filename,{start,end});
        downloadStream.pipe(res);
        return;
    })
})

module.exports = router;