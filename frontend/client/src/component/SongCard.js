import React from 'react'
import './SongCard.css';
import { MdDelete  } from 'react-icons/md'
import { BiAddToQueue } from 'react-icons/bi';
import { CurrentQueue } from '../App';
import { useContext } from 'react';
import { Zoom, Tooltip } from '@mui/material';
import { Socket, CurrentRoom } from '../App';
// import { useContext } from 'react';

const SongCard = ({song,type})=> {
  const {currentQueue, setCurrentQueue} = useContext(CurrentQueue);
  const {currentRoom} = useContext(CurrentRoom);
  const socket = useContext(Socket);
  // const {currentMusic, setCurrentMusic} = useContext(CurrentMusic);
  // function playSong(){
  //   setCurrentMusic(song);
  // }
  async function deleteSong(){
    if(currentQueue.nowPlaying._id == song._id){
      socket.emit('set_queue', {
        queue: {nowPlaying:(currentQueue.comingUpNext.length)?currentQueue.comingUpNext[0]:null,
        comingUpNext:(currentQueue.comingUpNext.length-1>0)?currentQueue.comingUpNext.slice(1):[],
        setter: false,},
        room: currentRoom._id,
      })
      await setCurrentQueue({
        nowPlaying:(currentQueue.comingUpNext.length)?currentQueue.comingUpNext[0]:null,
        comingUpNext:(currentQueue.comingUpNext.length-1>0)?currentQueue.comingUpNext.slice(1):[],
      })
    }
    else{
      socket.emit('set_queue',{
        queue:{nowPlaying: currentQueue.nowPlaying,
        comingUpNext: currentQueue.comingUpNext.filter((obj)=>obj._id!=song._id),
        setter: false,},
        room: currentRoom._id,
      })
      await setCurrentQueue({
        nowPlaying: currentQueue.nowPlaying,
        comingUpNext: currentQueue.comingUpNext.filter((obj)=>obj._id!=song._id)
      })
    }
  }

  async function addSong(){
    if(!currentQueue || (currentQueue.nowPlaying==null && !currentQueue.comingUpNext.length)){
      socket.emit('set_queue',{
        queue:{nowPlaying: {...song,_id:(song._id+Date.now().toString())},
        comingUpNext: [],
        setter: false,},
        room: currentRoom._id,
      })
      await setCurrentQueue({
        nowPlaying: {...song,_id:(song._id+Date.now().toString())},
        comingUpNext: [],
      })
    }
    else{
      socket.emit('set_queue',{
        queue:{nowPlaying: currentQueue.nowPlaying,
        comingUpNext: [...currentQueue.comingUpNext, {...song,_id:(song._id+Date.now().toString())}],
        setter: false,},
        room: currentRoom._id,
      })
      await setCurrentQueue({
        nowPlaying: currentQueue.nowPlaying,
        comingUpNext: [...currentQueue.comingUpNext, {...song,_id:(song._id+Date.now().toString())}],
      })
    }
  }

  return (
    <div className="cards_2" style={{margin:"4px 0px"}}>
      {
        (type=='add')?
        <BiAddToQueue onClick={addSong} className="hover-playbtn" style={{display:"block",background:"#666666",cursor:"pointer"}} viewBox='-7.6 -7 40 40' />
        :
        <MdDelete onClick={deleteSong} style={{display:"block",background:"#ff0000cc",cursor:"pointer"}} viewBox='-7.6 -7 40 40'  className="hover-playbtn" />
      }
        <div className="left_2">
            <img loading="lazy" src={`${process.env.REACT_APP_SERVER}/api/thumbnail/${song.thumbnail}`} alt="s"  />
        </div>
        <div className="right_2" style={{paddingLeft:0}}>
          <Tooltip TransitionComponent={Zoom} title={song.title}>
          <span className='title'>{song.title}</span>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title={song.artists}>
          <span className='singer'>{song.artists}</span>
          </Tooltip>
        </div>
        <div className="duration">
          {song.duration}
        </div>
    </div>
  )
}

export default SongCard
