import PlayListTile from "../Layout/PlayListTIle"
import './home.css'
import { useEffect } from "react";
import React from 'react';

const Home = () => {
    return ( 
        <div className="content" style={{display:"block"}}>
            <PlayListTile />        
        </div> 
    );
}
 
export default Home;