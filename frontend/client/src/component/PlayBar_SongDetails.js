import { AiOutlineHeart  } from 'react-icons/ai'
import { CgMaximize  } from 'react-icons/cg'
import { FaPlay  } from 'react-icons/fa'

import React from 'react';
import ReactDOM from "react-dom";

const SongDetails = () => {
    return ( 
            <div className="song-details " >
                <img src="https://raw.githubusercontent.com/mimansha-swarup/spotify-ui-clone/main/img_db/MadeForYou/HighPower.jpg" alt="music cover" />
                <div className="column" style={{justifyContent:"center"}}>
                    <p className="song-name" >SOng Name</p>
                    <small>singer</small>
                </div>
                <AiOutlineHeart className="song-detail-icon" />
                <FaPlay className="mob-view-playbtn" />
                <CgMaximize className="song-detail-icon"  />
            </div>
     );
}
 
export default SongDetails;