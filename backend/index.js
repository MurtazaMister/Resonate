const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {init_songs, song_router} = require('./uploads/songs');
const {init_images, image_router} = require('./uploads/images');
const { music_router } = require("./uploads/music");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Routers
app.use('/songs',song_router);
app.use('/images',image_router);
app.use('/music',music_router);

const port = process.env.port || 5000;

app.get("/", (req,res)=>{
    res.send("Server up and running");
})

connectDB(process.env.mongoURI).then(()=>{
    console.log("Connected to database");
    const conn = mongoose.connection;
    init_songs(conn);
    init_images(conn);
    app.listen(port, ()=>{
        console.log(`Server is up and running on http://localhost:${port}/`);
    })
}).catch((err)=>{
    console.log(err);
})