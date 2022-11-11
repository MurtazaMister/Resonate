const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Room = require("./models/room.model");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Setting up the socket server

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.frontend,
        methods: ["GET", "POST"]
    }
});

io.on("connection",(socket)=>{
    socket.on('join_room', (data)=>{
        socket.join(data);
    });
    
    socket.on('leave_room', async (data)=>{
        socket.leave(data);
        let room = await Room.findById(data);
        socket.broadcast.to(data).emit('updated_room', room);
    });

    socket.on("set_queue", (data)=>{
        socket.broadcast.to(data.room).emit('get_queue', data.queue);
    });

    socket.on("set_music", (data)=>{
        socket.broadcast.to(data.room).emit('get_music', data.music);
    });
})

const socketPort = process.env.socketPort || 7000;

server.listen(socketPort, ()=>{
    console.log(`Socket server up and running on port ${socketPort}`);
})

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

const port = process.env.port || 5000;

app.get("/", (req,res)=>{
    res.send("Server up and running");
})

connectDB(process.env.mongoURI).then(()=>{
    console.log("Connected to database");
    const conn = mongoose.connection;
    [gridfsBucket_songs,gfs_songs] = init_songs(conn);
    [gridfsBucket_images,gfs_images] = init_images(conn);
    
    app.listen(port, ()=>{
        console.log(`Server is up and running on http://localhost:${port}/`);
    })
}).catch((err)=>{
    console.log(err);
})