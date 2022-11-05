import { BsPlayFill  } from 'react-icons/bs'
import {NavLink} from 'react-router-dom'
import React from 'react';
import ReactDOM from "react-dom";

const MusicCard = ({parser,styleCheck}) => {

    return ( 
        <NavLink style={{marginLeft:"7px",marginRight:"7px"}} to={{
            pathname:`songs/${parser.id}`,
            state:{check: parser}
        }}>
        <div style={{width:"fit-content"}} className={styleCheck?"music-card neumorphisim-musiccard":"music-card library-card"} >
        <img loading="lazy" src={parser.image} alt="s"  />
        
        <BsPlayFill viewBox='-0.5 0 16 16' className="hover-playbtn"  />
        <div>
            <span style={{width:"150px"}} className="title">{parser.song}</span>
            <span style={{width:"150px"}} className="singer">{parser.singer}</span>
        </div>
        
        
        
        </div> 
        </NavLink>
            
     );
}
 
export default MusicCard;