import './displayRoom.css'
import React, { useEffect, useState } from 'react';
import SongCard from '../component/SongCard';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const DisplayRoom = (props) => {

    const {user} = useAuthContext();
    useEffect(async ()=>{
        let room_id = window.location.href.split('/')[4].substring(0,24)
        let res = await axios.patch(`${process.env.REACT_APP_SERVER}/api/room/${room_id}`,{},{
        headers:{
            'Authorization': `Bearer ${user.token}`,
        },
        });
        
    },[user]);

    return ( 
        <>
            <div className="body">
                <div className="select">
                    select here
                </div>
                <div className="queue">
                    <SongCard title="Title" singer="singer" duration="3:02" ></SongCard>
                </div>
            </div>
        </>
    );
}
 
export default DisplayRoom;