import React from 'react'
import { useState } from 'react'
import './host.css';
import {useHistory} from 'react-router-dom';


const Host = () => {
    const [name, setName] = useState("");
    const history = useHistory();
    const handleSubmit = event => {
        event.preventDefault();
        
      };
  return (
    
    <div className="content">
      <form className='create_room' onSubmit={handleSubmit}>
        <label>
            Room Name:
            <input type="text" name="roomname" className='roomname' value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <br/>
        <button type="submit"className='sub_button' onClick={() => history.push('/rooms')}>Create</button>
      </form>
    </div>
  )
}

export default Host
