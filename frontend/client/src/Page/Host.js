import React from 'react'
import { useState } from 'react'
import './host.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import {CurrentRoom} from '../App';
import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Host = () => {

    const [image, setImage] = useState();
    const [error_image, setImageError] = useState();

    const {currentRoom, setCurrentRoom} = useContext(CurrentRoom);
    const [name, setName] = useState("");
    const [err, setErr] = useState(undefined);
    const {user} = useAuthContext();
    const history = useHistory();
    const [load, setLoad] = useState(false);

    function onFileChange(e){
      setImage(e.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr(undefined);
        try {
          setLoad(true);
          const formdata = new FormData();
          formdata.append('thumbnail',image);

          let res_image = await axios.post(`${process.env.REACT_APP_SERVER}/images/upload`,formdata,{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${user.token}`,
            }
          })
          if(res_image.data.status == "success"){
            setImageError(false);
            
            let res = await axios.post(`${process.env.REACT_APP_SERVER}/api/room/create`,{
              roomname: name,
              thumbnail: res_image.data.id,
            },{
              headers: {
                'Authorization': `Bearer ${user.token}`,
              }
            });
            if(res.data.status == "success"){
              setCurrentRoom(res.data.room);
              setLoad(false);
              history.push(`/room/${res.data._id}`);
            }
            else{
              setLoad(false);
              setErr("You are already in a room");
            }
          }
          else{
            setLoad(false);
            setImageError(true);
            return;
          }

        } catch (err) {
          setLoad(false);
          setErr("You are already in a room");
        }  
    };
  return (
    
    <div className="content">
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={load}
      // onClick={handleClose}
    >
    <CircularProgress style={{position:"absolute"}} color="inherit" />
    </Backdrop>
      <form className='create_room' onSubmit={handleSubmit}>
        <div className='inp'>
          <label htmlFor='thumbnail'>
              Thumbnail:
          </label>
        <input type="file" name="thumbnail" id="thumbnail" onChange={onFileChange} />
          {error_image && <span style={{color:"red"}}>Error: Invalid file or filesize &#40;&lt;=2MB, reupload file&#41;</span>}
        </div>

        <div className='inp'>
          <label htmlFor='roomname'>
              Room Name:
          </label>
          <input type="text" id="roomname" name="roomname" className='roomname' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        {
          currentRoom?<span style={{color:"red", marginTop:"15px", fontSize:"16px"}}>You are already in a room</span>:
          <button type="submit" className='sub_button'>Create</button>
        }
        {err && <span style={{color:"red", marginTop:"15px", fontSize:"16px"}}>{err}</span>}
      </form>
    </div>
  )
}

export default Host
