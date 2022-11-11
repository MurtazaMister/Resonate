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

const NavBar = () => {
  const {currentRoom, setCurrentRoom} = useContext(CurrentRoom);
  const history = useHistory();
  let location = useLocation();
  const {dispatch, user} = useAuthContext();

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
      setCurrentRoom();
      let res = await axios.patch(`${process.env.REACT_APP_SERVER}/api/room/leave`,{},{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
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
          { user && <div className="nav-grid" style={{gridTemplateColumns: (currentRoom)?"40px 1fr 1fr":"repeat(2,1fr)"}}>

          {currentRoom && 
          <Link className="link-reset" style={{width:"fit-content"}} to={`/room/${currentRoom._id}`}>
          <Tooltip TransitionComponent={Zoom} title={currentRoom.roomname}>
            <button style={{width:"40px"}} className="user-btn">
              {(currentRoom.master==user._id)?<AiFillCrown style={{color: "gold", fontSize: "1.5em"}} />:
                <GoPrimitiveDot style={{color: "green", fontSize: "1.5em"}} />
              }
          </button>
          </Tooltip>
          </Link>
          }

          <button className="upgrade-btn">
              UPGRADE
            </button>

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