import { IoChevronBackCircleOutline ,IoChevronForwardCircleOutline } from 'react-icons/io5'
import { IconContext  } from 'react-icons'
import { useHistory, NavLink as Link, useLocation } from "react-router-dom";
import React from 'react';
import { Tooltip, Zoom } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const NavBar = () => {
  const history = useHistory();
  let location = useLocation();
  const {dispatch, user} = useAuthContext();

  async function handleLogout(){
    try {
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
          { user && <div className="nav-grid" style={{gridTemplateColumns: (user.room)?"repeat(3,1fr)":"repeat(2,1fr)"}}>

          {user.room && <button className="user-btn">
                  {user.room}
          </button>}

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