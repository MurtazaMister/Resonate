import React from 'react'
import './SongCard.css';
import { BsPlayFill  } from 'react-icons/bs'

const SongCard = (props)=> {
  return (
    <div className="cards_2">
        <BsPlayFill  viewBox='-0.5 0 16 16' className="hover-playbtn">
        </BsPlayFill>
        <div className="left_2">
            <img src ="http://localhost:5000/api/thumbnail/636954cf844705c3403b80a4"></img>
        </div>
        <div className="right_2">
          <span className='title'>{props.title}</span>
          <span className='singer'>{props.singer}</span>
        </div>
        <div className="duration">
          {props.duration}
        </div>
    </div>
  )
}

export default SongCard
