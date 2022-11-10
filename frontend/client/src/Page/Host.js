import React from 'react'
import { useState } from 'react'
import './host.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const Host = () => {
    const [name, setName] = useState("");
    const [err, setErr] = useState(undefined);
    const {user} = useAuthContext();
    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr(undefined);
        try {
          let res = await axios.post(`${process.env.REACT_APP_SERVER}/api/room/create`,{
            roomname: name,
          },{
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
          if(res.data.status == "success"){
            history.push(`/room/${res.data._id}`);
          }
          else{
            setErr("User already in a room");
          }
        } catch (err) {
          setErr("User already in a room");
        }  
    };
  return (
    
    <div className="content">
      <form className='create_room' onSubmit={handleSubmit}>
        <div className='inp'>
          <label htmlFor='roomname'>
              Room Name:
          </label>
          <input type="text" id="roomname" name="roomname" className='roomname' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <button type="submit" className='sub_button'>Create</button>
        {err && <span style={{color:"red", marginTop:"15px", fontSize:"16px"}}>{err}</span>}
      </form>
    </div>
  )
}

export default Host
