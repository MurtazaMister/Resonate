import './displayRoom.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import searchPg from './searchpg';
import { BsSearch } from 'react-icons/bs';
import SongPage from './SongPage';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import PlayListTile from '../Layout/PlayListTIle';
import { Songs } from '../db/db';
import SongCard from '../component/SongCard';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const DisplayRoom = (props) => {
    const [view,setView] = useState(false); 
    const [participants,setParticipants] = useState(0);
    // const navigate = Redirect();

    return ( 
        <div className="content" >
               <div className="main" style={{display:"flex", flexDirection:"row"}}>
                    <div className="left">
                        <h3>Room name{props.room_name}<span>Active Participants : {participants}</span><NavLink to = '/home'><Button className="leave" variant="danger" >Leave</Button></NavLink></h3>
                        
                        <PlayListTile style={{width:'40%'}}/>

                        
                    </div>
                    <div className="right">
                        <div className='queee'>
                        {
                            Songs.map((tile) => ( 
                                <div className = "genre-tile" key = { tile.title } >
                                    <div className = "genre-header" >
                                        {/* <h1 style = {{ fontSize: "clamp(20px,2vw ,24px)" , textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap" } } > { tile.title } </h1>   */}
                                        {/* <h5 style = {{ color: "rgba(255,255,255,0.70)", textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"  } } > See more </h5>  */}
                                    </div> 
                                    <div className="music-list" style={{display:"block"}}>
                                        {
                                            tile.list.map((gerneTile) => ( 
                                                // <span>{gerneTile.song} <br></br></span> 
                                                <SongCard title={gerneTile.song} singer={gerneTile.singer}/>             
                                            ))
                                        }  
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
        </div>

        
        </div> 
    );
}
 
export default DisplayRoom;