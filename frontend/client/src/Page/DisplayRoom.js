import './displayRoom.css'
import React, { useEffect, useState } from 'react';
import SongCard from '../component/SongCard';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {CurrentRoom} from '../App';
import { useContext } from 'react';
import SongListing from '../Layout/SongListing';
import { BiSearchAlt } from 'react-icons/bi';
import { CurrentQueue } from '../App';
import { Socket } from '../App';

const DisplayRoom = (props) => {

    const {user} = useAuthContext();
    const history = useHistory()
    const {currentRoom, setCurrentRoom} = useContext(CurrentRoom);
    const {currentQueue, setCurrentQueue} = useContext(CurrentQueue);
    const [songs, setSongs] = useState([]);
    const socket = useContext(Socket);

    useEffect(async ()=>{
        socket.on('get_queue',(queue)=>{
            setCurrentQueue(queue);
        })
    }, [socket])

    useEffect(async ()=>{
        if(currentQueue.setter!=false){
            let res = await axios.post(`${process.env.REACT_APP_SERVER}/api/room/queue`,{
                queue: currentQueue,
                roomId: currentRoom._id,
            },{
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
            });
        }
    },[currentQueue])

    useEffect(async ()=>{
        if(Object.keys(currentRoom.queue).length){
            setCurrentQueue({
                nowPlaying:(Object.keys(currentRoom.queue).length)?currentRoom.queue.nowPlaying:null,
                comingUpNext:(Object.keys(currentRoom.queue).length-1>0)?currentRoom.queue.comingUpNext:[],
            })
        }
    },[currentRoom])
    
    useEffect(async ()=>{
        let room_id = window.location.href.split('/')[4].substring(0,24)
        let res = await axios.patch(`${process.env.REACT_APP_SERVER}/api/room/${room_id}`,{},{
        headers:{
            'Authorization': `Bearer ${user.token}`,
        },
        });
        if(res.data.status=='success'){
            setCurrentRoom(res.data.room);
            socket.emit('join_room',room_id);
        }
        else{
            history.replace('/rooms')
        }

        
        let music_public = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/public`);


        let music_self = await axios.get(`${process.env.REACT_APP_SERVER}/api/music/self?limit=20`,{
            headers:{
                'Authorization': `Bearer ${user.token}`,
            },
        });
        await setSongs([{
            title: "Public collection",
            list: music_public.data,
    },{
            title: "Private Collection",
            list: music_self.data,
        }]);
        
    },[user]);

    return ( 
        <>
            <div className="body">
                <div className="select">
                    <div className="search-div">
                        <input type="text" name="search" id="search" style={{width:"100%"}} />
                        <BiSearchAlt style={{position: "absolute",top: "38%",right: "5%",color: "black",}} />
                    </div>
                    <div className='mega-container'>
                        {
                            (songs?.length==2) && songs.map((song)=>{
                                return <SongListing key={song.title} type="add" song={song} />
                            })
                        }
                    </div>
                </div>
                {!currentQueue && <div className='empty'>Queue is empty</div>}
                {currentQueue && <div style={{overflow: "auto",display: "flex",flexDirection: "column",}}>
                    <div className='now-playing'>
                        <div>Now playing:</div>
                        {currentQueue.nowPlaying && <SongCard className='song-card' song={currentQueue.nowPlaying} />}
                    </div>
                    <div className="queue">
                        <div>Coming up next:</div>
                        <div style={{flexDirection:'column'}}>
                            {(currentQueue.comingUpNext.length>0) && 
                                currentQueue.comingUpNext.map((song_item)=>{
                                    return <SongCard key={song_item._id+Date.now()} className='song-card' song={song_item} />
                                })
                            }
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
}
 
export default DisplayRoom;