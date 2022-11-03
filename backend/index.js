const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {init_songs, song_router} = require('./uploads/songs');
const {init_images, image_router} = require('./uploads/images');

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Routers
app.use('/songs',song_router);
app.use('/images',image_router);

const mongoURI = process.env.mongoURI;
const conn = mongoose.createConnection(mongoURI);
const port = process.env.port || 5000;

app.get("/", (req,res)=>{
    res.send("hello world");
})

conn.once('open',()=>{

    init_songs(conn);
    init_images(conn);

    console.log("Connected to database");

    app.listen(port, ()=>{
        console.log(`Server listening on http://localhost:${port}`);
    })

})