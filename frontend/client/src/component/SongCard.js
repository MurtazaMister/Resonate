import React from 'react'
import './SongCard.css';
import { BsPersonFill,BsMusicNote } from "react-icons/bs";

const SongCard = (props)=> {
  return (
    <div className='container-cards_2'>
        <div className="cards_2" style={{display:"flex", flexDirection:"row"}}>
            <div className="left_2">
                <img src ="http://localhost:5000/api/thumbnail/636954cf844705c3403b80a4" style={{height:70, width:70}}></img>
            </div>
            <div className="right_2">
            <h5 style={{marginLeft:10}}>{props.title}</h5>
            <h6 style={{marginLeft:10}}>{props.singer}</h6>
            </div>
        </div>
    </div>
  )
}

export default SongCard
