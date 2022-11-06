import { Songs } from "../db/db";
import MusicCard from "../component/MusicCard";
import axios from 'axios';

import React from 'react';
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const PlayListTile = () => {

    const [songs, setSongs] = useState([]);

    useEffect(async ()=>{
        setSongs([]);

        // Recently Added - public - /public
        let music = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/public`);
        // console.log(music);
        await setSongs((songs)=>{
            return [...songs,{
                title: "Recently Added",
                list: music.data,
            }]
        });

        // Your uploads - self uploaded songs - /self
        // Your private collection - self uploaded private songs - /private
        // Top playlists - public - /playlists/public
        // Your playlists - /playlists/self
        // Your private jukebox - /playlists/private
        // All the artists - sorting artists wise - /artists
    },[]);

    return (
        songs.map((tile) => ( 
            <div className = "genre-tile" key = { tile.title } >
                <div className = "genre-header" >
                    <h1 style = {{ fontSize: "clamp(20px,2vw ,24px)" , textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap" } } > { tile.title } </h1>  
                    <h5 style = {{ color: "rgba(255,255,255,0.70)", textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"  } } > See more </h5> 
                </div> 
                <div className="music-list">
                    {
                        tile.list.map((genreTile) => ( 
                            <MusicCard parser = { genreTile } styleCheck="true" key={genreTile.song} />                     
                        ))
                    }  
                </div>
            </div>
        ))
    );
}

export default PlayListTile;