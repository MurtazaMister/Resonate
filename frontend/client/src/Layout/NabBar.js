import { IoChevronBackCircleOutline ,IoChevronForwardCircleOutline } from 'react-icons/io5'
import { IconContext  } from 'react-icons'
import { useHistory, NavLink as Link, useLocation } from "react-router-dom";
import React from 'react';
import { Tooltip, Zoom } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import {CurrentRoom} from '../App';
import { useContext } from 'react';
import { AiFillCrown } from 'react-icons/ai';
import {GoPrimitiveDot} from 'react-icons/go';
import { useEffect } from 'react';
import { CurrentQueue, Socket } from '../App';

const NavBar = () => {
  const {currentRoom, setCurrentRoom} = useContext(CurrentRoom);
  const history = useHistory();
  let location = useLocation();
  const {dispatch, user} = useAuthContext();
  const {currentQueue, setCurrentQueue} = useContext(CurrentQueue);
  const socket = useContext(Socket);

  async function leaveRoom(){
    let res = await axios.patch(`${process.env.REACT_APP_SERVER}/api/room/leave`,{},{
      headers:{
          'Authorization': `Bearer ${user.token}`,
      },
    });
    if(res.data.status=='success'){
        socket.emit('leave_room', currentRoom._id);
        await setCurrentRoom();
        setCurrentQueue();
        history.replace('/')
    }
  }

  useEffect(async ()=>{
    let res = await axios.get(`${process.env.REACT_APP_SERVER}/api/user/check`,{
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    setCurrentRoom(res.data.room)
  },[user])

  async function handleLogout(){
    try {
      let res = await axios.patch(`${process.env.REACT_APP_SERVER}/api/room/leave`,{},{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if(currentRoom) {socket.emit('leave_room', currentRoom._id);}
      await setCurrentRoom();
      localStorage.removeItem('user');
      dispatch({type: 'LOGOUT'})
    } catch (err) {
      console.log(err);
    }
  }

    return ( 
        
      <IconContext.Provider value={{ className: 'nav-logo'}}>
        <header className="nav-details">
          <div className="nav-grid">
            <IoChevronBackCircleOutline onClick={()=>history.goBack()} />
            <IoChevronForwardCircleOutline onClick={()=>history.goForward()} />
            
          </div>
          { user && <div className="nav-grid" style={{gridTemplateColumns: (currentRoom)?`${window.location.href.split('/').splice(3,2).join('/')==`room/${currentRoom?._id}`?'1fr':'40px'} 1fr 1fr`:"repeat(2,1fr)"}}>

          {
            (window.location.href.split('/').splice(3,2).join('/')==`room/${currentRoom?._id}`)?
            
            <button style={{background:"#bb1919e0"}} onClick={leaveRoom} className="user-btn">
              Leave
            </button>
          :
          (currentRoom && 
          <Link className="link-reset" style={{width:"fit-content"}} to={`/room/${currentRoom._id}`}>
          <Tooltip TransitionComponent={Zoom} title={currentRoom.roomname}>
            <button style={{width:"40px"}} className="user-btn">
              {(currentRoom.master==user._id)?<AiFillCrown style={{color: "gold", fontSize: "1.5em"}} />:
                <GoPrimitiveDot style={{color: "green", fontSize: "1.5em"}} />
              }
            </button>
          </Tooltip>
          </Link>
          )}
          <Link className="link-reset" style={{width:"fit-content"}} to={`/upgrade`}>
          <button className="upgrade-btn">
              UPGRADE
            </button>
            </Link>
            <Tooltip TransitionComponent={Zoom} title={user.username}>
              <button className="user-btn" onClick={handleLogout}>
                  Logout
              </button>
            </Tooltip>
            </div>}
          { !user && <div className='nav-grid' style={{display: "flex",width:"100%",justifyContent: "flex-end"}}> 
            <button className="user-btn" style={{width:"100%"}}>
            {(location.pathname=='/login')?<Link style={{textDecoration:"none", color: "white"}} to="/register"> Signup </Link>:<Link style={{textDecoration:"none", color: "white"}} to="/login"> Login </Link>}
            </button>
          </div>
          }
          
        </header>
      </IconContext.Provider>
      
     );
}
 
export default NavBar;