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

import { CurrentMusic } from '../App';
import { useContext } from 'react';

const PlayBar = (props) => {

    const {currentMusic} = useContext(CurrentMusic);

    useEffect(async ()=>{
        await document.getElementById('song').play();
    },[currentMusic])
    
    return ( 
        <footer className="music-bar d-flex justify-content-center p-2">
        {currentMusic && <div className='music-info'>
            <img style={{width:"54px", height:"54px"}} src={(currentMusic?.thumbnail)?`${process.env.REACT_APP_SERVER}/api/thumbnail/${currentMusic?.thumbnail}`:""} alt={(currentMusic?.thumbnail)?currentMusic.title:""} />
            <div className='title-artist-area marquee'>
                <span class="song-title">{currentMusic.title}</span>
                <span class="song-artists">{currentMusic.artists}</span>
            </div>
        </div>}
            <audio style={{outline:"none"}} controls src={(currentMusic?.song)?`${process.env.REACT_APP_SERVER}/api/song/${currentMusic?.song}`:""} id="song" />
            

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