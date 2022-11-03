// import { IconContext  } from 'react-icons'

import { AiOutlineMenuUnfold  } from 'react-icons/ai'
import { IoVolumeLow  } from 'react-icons/io5'
import { HiDeviceMobile  } from 'react-icons/hi'
import $ from 'jquery';
import Popper from 'popper.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PlayBar.css'

import SongController from '../component/playbar_songController'
import SongDetails from '../component/PlayBar_SongDetails'
import React from 'react';
import ReactDOM from "react-dom";


const PlayBar = (props) => {
    
    return ( 

        <footer className="music-bar d-flex justify-content-center p-2">
        {/* <footer className="music-bar"> */}
            <audio controls src="" id="song" />
            {/* <SongDetails />
            <SongController />            
            <div className="volume-controller " >
                <HiDeviceMobile className ="volume-controller-icons" />
                <AiOutlineMenuUnfold className ="volume-controller-icons" />
                <IoVolumeLow className ="volume-controller-icons" />
                <hr />
            </div> */}
        </footer>
      
    );
}
 
export default PlayBar;