import React from 'react'
import './roomCard.css';
import { BsPersonFill,BsMusicNote } from "react-icons/bs";

const RoomCard = (props)=> {
  return (
    <div>
        <div className="cards">
        <div className="rectangle_2">
        </div>
        <div className="left">
            <h1 style={{marginLeft:"20px"}}>Room name</h1><h4 style={{color:"green", marginLeft:"30px"}}>Online</h4>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <BsMusicNote style={{marginLeft:"20px"}}/>{props.song_name} by {props.artist}
        </div>  
        <div className="right">
            <BsPersonFill />&nbsp;{props.people}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {props.time}
        </div>  
        </div>

      
    </div>
  )
}

export default RoomCard
