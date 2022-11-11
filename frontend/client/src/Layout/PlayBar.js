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
import { CurrentQueue } from '../App';

const PlayBar = (props) => {

    const {currentMusic, setCurrentMusic} = useContext(CurrentMusic);
    const {currentQueue, setCurrentQueue} = useContext(CurrentQueue);

    useEffect(async ()=>{
        await document.getElementById('song').play();
    },[currentMusic])

    useEffect(async ()=>{
        if(currentQueue && currentQueue.nowPlaying){
            setCurrentMusic({...currentQueue.nowPlaying,room:true,_id:(currentQueue.nowPlaying._id.substring(0,24))})
        }
    },[currentQueue])
    
    return ( 
        <footer className="music-bar d-flex justify-content-center p-2">
        {currentMusic && <div className='music-info'>
            <img style={{width:"54px", height:"54px"}} src={(currentMusic?.thumbnail)?`${process.env.REACT_APP_SERVER}/api/thumbnail/${currentMusic?.thumbnail}`:""} alt={(currentMusic?.thumbnail)?currentMusic.title:""} />
            <div className='title-artist-area marquee'>
                <span className="song-title">{currentMusic.title}</span>
                <span className="song-artists">{currentMusic.artists}</span>
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