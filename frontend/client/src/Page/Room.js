import React, { useEffect, useState } from 'react'
import RoomCard from '../component/RoomCard';
import {NavLink as Link} from 'react-router-dom';
import "./Room.css";
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const Room = () => {

  const {user} = useAuthContext();
  const [rooms, setRooms] = useState([]);

  useEffect(async ()=>{
    let res = await axios.get(`${process.env.REACT_APP_SERVER}/api/room`,{
      headers:{
        'Authorization': `Bearer ${user.token}`,
      },
    });
    await setRooms(res.data.rooms);
  },[user]);

  return (
    <div className="content" style={{display:"block"}}>
      <h1>Your Parties</h1><br/>
      {/* <Link className="link-reset" to="/displayroom"><RoomCard people="20" song_name="song name" artist="artist name" time="2hrs"/></Link><br/> */}
      {
        rooms.map((room)=>{
          return <Link className="link-reset" to={`/room/${room._id}`}><RoomCard key={room._id} name={room.roomname} people={room.members} thumbnail={room.thumbnail} status={room.status} music={(room?.queue?.nowPlaying)?room?.queue?.nowPlaying:''} time={room.createdAt} /></Link>
        })
      }
    </div>
  )
}

export default Room
