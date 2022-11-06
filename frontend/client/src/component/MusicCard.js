import { BsPlayFill  } from 'react-icons/bs'
import {NavLink} from 'react-router-dom'
import React from 'react';
import ReactDOM from "react-dom";

const MusicCard = ({parser,styleCheck}) => {

    return ( 
        <NavLink style={{marginLeft:"7px",marginRight:"7px"}} 
        to={{
            pathname:`songs/${parser.song}`,
            state:{check: parser}
        }}
        >
        <div style={{width:"fit-content"}} className={styleCheck?"music-card neumorphisim-musiccard":"music-card library-card"} >
        <img loading="lazy" src={`${process.env.REACT_APP_SERVER}/api/thumbnail/${parser.thumbnail}`} alt="s"  />
        
        <BsPlayFill viewBox='-0.5 0 16 16' className="hover-playbtn"  />
        <div>
            <span style={{width:"150px"}} className="title">{parser.title}</span>
            <span style={{width:"150px"}} className="singer">{parser.artists}</span>
        </div>
        
        
        
        </div> 
        </NavLink>
            
     );
}
 
export default MusicCard;