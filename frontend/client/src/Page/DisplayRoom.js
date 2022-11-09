import './displayRoom.css'
import React, { useState } from 'react';
import SongPage from './SongPage';
import SongCard from '../component/SongCard';

const DisplayRoom = (props) => {

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