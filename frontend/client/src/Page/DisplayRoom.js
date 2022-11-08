import './displayRoom.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import searchPg from './searchpg';
import { BsSearch } from 'react-icons/bs';
import SongPage from './SongPage';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import PlayListTile from '../Layout/PlayListTIle';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const DisplayRoom = (props) => {
    const [view,setView] = useState(false); 
    const [participants,setParticipants] = useState(0);
    // const navigate = Redirect();

    return ( 
        <div className="content">
               <div className="main">
                    <div className="left">
                        <h3>Room name{props.room_name}<span>Active Participants : {participants}</span></h3>
                        <PlayListTile/>

                        <NavLink to = '/home'><Button className="leave" variant="danger" >Leave</Button></NavLink>
                    </div>
                    <div className="right">
                        <BsSearch onClick={()=>{if(view === false){setView(true);} else{setView(false);}}}/>
                    </div>
                </div>
        </div> 
    );
}
 
export default DisplayRoom;