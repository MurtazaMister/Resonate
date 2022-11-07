import { Songs } from "../db/db";
import MusicCard from "../component/MusicCard";
import axios from 'axios';

import React from 'react';
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from '../hooks/useAuthContext';

const PlayListTile = () => {
    
    const {user} = useAuthContext();
    const [songs, setSongs] = useState([]);

    useEffect(async ()=>{
        await setSongs([]);
        
        // Recently Added - public - /public
        let music_public = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/public?limit=20`);
        await setSongs((songs)=>{
            return [{
                title: "Recently Added",
                list: music_public.data,
            }]
        });

        // Your uploads - self uploaded songs - /self
        let music_self = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/self?limit=20`,{
          headers:{
            'Authorization': `Bearer ${user.token}`,
          },
        });
        await setSongs((songs)=>{
            return [...songs,{
                title: "Your uploads",
                list: music_self.data,
            }]
        });

        // Your private collection - self uploaded private songs - /private
        let music_private = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/private?limit=20`,{
          headers:{
            'Authorization': `Bearer ${user.token}`,
          },
        });
        await setSongs((songs)=>{
            return [...songs,{
                title: "Your private collection",
                list: music_private.data,
            }]
        });

        // All the artists - sorting artists wise - /artists
        let music_artists = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/artists?limit=20`,{
            headers:{
              'Authorization': `Bearer ${user.token}`,
            },
        });
        console.log(music_artists.data);    
        await setSongs((songs)=>{
            return [...songs, ...music_artists.data.map(music_ele=>{
                return music_ele.artists.length?{
                    title: `Listen to ${music_ele.artists.split(' ').map(word=>word[0].toUpperCase()+word.substr(1,word.length-1)).join(' ')}`,
                    list: music_ele.songs,
                }:undefined
            })]
        })

        // Top playlists - public - /playlists/public
        // Your playlists - /playlists/self
        // Your private jukebox - /playlists/private
    },[user]);

    return (
        songs.map((tile) => tile?.list?.length?( 
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
        ):'')
    );
}

export default PlayListTile;