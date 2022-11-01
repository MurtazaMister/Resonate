import PlayListTile from "../Layout/PlayListTIle"
import './home.css'
import { useEffect } from "react";
import React from 'react';
import ReactDOM from "react-dom";

const Home = () => {
    useEffect(() => {
        
    }, [])
    return ( 
        <div className="content">
            <PlayListTile />        
        </div> 
    );
}
 
export default Home;