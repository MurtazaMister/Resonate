import React from 'react'
import RoomCard from '../component/RoomCard';
import {NavLink as Link} from 'react-router-dom';
import "./Room.css";

const Room = () => {
  return (
    <div className="content">
      <h1>Your Parties</h1><br/>
      <Link className="link-reset" to="/displayroom"><RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/></Link><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
    </div>
  )
}

export default Room
