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

    async function endHandler(){
        let actualDuration = Number(currentMusic.duration.split(':')[0])*60 + Number(currentMusic.duration.split(':')[1]);
        let stallDuration = document.getElementById('song').currentTime;
        if(currentQueue && currentQueue.comingUpNext.length && Math.abs(actualDuration - stallDuration) < 5){
            await setCurrentQueue({
                nowPlaying:(currentQueue.comingUpNext.length)?currentQueue.comingUpNext[0]:null,
                comingUpNext:(currentQueue.comingUpNext.length-1>0)?currentQueue.comingUpNext.splice(1):[],
            })
        }
        else if(Math.abs(actualDuration - stallDuration) < 5){
            document.getElementById('song').src = '';
            document.getElementById('song').src = `${process.env.REACT_APP_SERVER}/api/song/${currentMusic?.song}`;
            if(currentQueue){
                setCurrentQueue({
                    nowPlaying:(currentQueue.comingUpNext.length)?currentQueue.comingUpNext[0]:null,
                    comingUpNext:(currentQueue.comingUpNext.length-1>0)?currentQueue.comingUpNext.splice(1):[],
                })
            }
        }
    }

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
            <audio onStalled={endHandler} style={{outline:"none"}} controls src={(currentMusic?.song)?`${process.env.REACT_APP_SERVER}/api/song/${currentMusic?.song}`:""} id="song" />
            

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