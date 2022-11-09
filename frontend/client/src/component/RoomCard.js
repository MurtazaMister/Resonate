import React from 'react'
import './roomCard.css';
import { BsPersonFill,BsMusicNote } from "react-icons/bs";

const RoomCard = (props)=> {
  return (
    <div className='container-cards'>
        <div className="cards">
          <div className="rectangle_2">
            <img src="http://localhost:5000/api/thumbnail/63695991844705c3403b817b" alt="" />
          </div>
          <div className='card-data'>
            <div className="roomcard-top">
              <div className='roomcard-top-column'>
                <h1 className='room-title'>{props.name}</h1>
                <h4 className='room-status' style={{color:(props.status=='Online')?"green":"red"}}>{props.status}</h4>
              </div>
              <div className='room-participants'>
                {props.people}
                <BsPersonFill />
              </div>
            </div>  
            <div className="roomcard-bottom">
              <div><BsMusicNote/>{props.song_name} by {props.artist}</div>
              {props.time}
            </div>
          </div>
        </div>
    </div>
  )
}

export default RoomCard
