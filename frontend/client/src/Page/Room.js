import React from 'react'
import RoomCard from '../component/RoomCard';
import {Route,Redirect} from 'react-router-dom';

const Room = () => {
  const navigate = Redirect();
  return (
    <div className="content">
      <h1>Your Parties</h1><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs" onClick={()=>navigate('/displayroom')}/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
      <RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/><br/>
    </div>
  )
}

export default Room
