const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const Room = require("./models/room.model");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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

const socketPort = process.env.PORT || 7000;

app.get("/", (req,res)=>{
    res.send("Socket up and running");
})

connectDB(process.env.mongoURI).then(()=>{
    console.log("Connected to database");
    server.listen(socketPort, ()=>{
        console.log(`Socket server up and running`);
    })
}).catch((err)=>{
    console.log(err);
})
