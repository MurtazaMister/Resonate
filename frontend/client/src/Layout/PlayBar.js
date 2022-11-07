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
import React, { useEffect } from 'react';
import ReactDOM from "react-dom";

import { CurrentSong } from '../App';
import { useContext } from 'react';

const PlayBar = (props) => {

    const {currentSong} = useContext(CurrentSong);

    useEffect(async ()=>{
        await document.getElementById('song').play();
    },[currentSong])
    
    return ( 
        <footer className="music-bar d-flex justify-content-center p-2">
        {/* <footer className="music-bar"> */}
            <audio controls src={(currentSong)?`${process.env.REACT_APP_SERVER}/api/song/${currentSong}`:""} id="song" />
            

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