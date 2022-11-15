const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Room = require("./models/room.model");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Setting up the node server

const {init_songs, song_router} = require('./uploads/songs');
const {init_images, image_router} = require('./uploads/images');
const { music_router } = require("./uploads/music");
const api_music_router = require("./api/music.api");
const api_thumbnail_router = require("./api/thumbnail.api");
const api_song_router = require('./api/song.api');
const api_user_router = require('./api/user.api');
const api_room_router = require('./api/room.api');

let gfs_images,gridfsBucket_images;
let gfs_songs,gridfsBucket_songs;

// Routers
app.use('/songs',song_router);
app.use('/images',image_router);
app.use('/music',music_router);
app.use('/api/music',api_music_router);
app.use('/api/thumbnail',function(req,res,next){
    req.gridfsBucket_images = gridfsBucket_images;
    req.gfs_images = gfs_images;
    next();
},api_thumbnail_router);
app.use('/api/song',function(req,res,next){
    req.gridfsBucket_songs = gridfsBucket_songs;
    req.gfs_songs = gfs_songs;
    next();
},api_song_router);
app.use('/api/user',api_user_router);
app.use('/api/room',api_room_router);

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const port = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.send("Server up and running");
})

connectDB(process.env.mongoURI).then(()=>{
    console.log("Connected to database");
    const conn = mongoose.connection;
    [gridfsBucket_songs,gfs_songs] = init_songs(conn);
    [gridfsBucket_images,gfs_images] = init_images(conn);
    
    app.listen(port, ()=>{
        console.log(`Server is up and running`);
    })
}).catch((err)=>{
    console.log(err);
})