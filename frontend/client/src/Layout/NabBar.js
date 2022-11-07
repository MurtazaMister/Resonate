import { IoChevronBackCircleOutline ,IoChevronForwardCircleOutline } from 'react-icons/io5'
import { IconContext  } from 'react-icons'
import { useHistory, NavLink as Link, useLocation } from "react-router-dom";
import React from 'react';
import { Tooltip, Zoom } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
  const history = useHistory();
  let location = useLocation();
  const {dispatch, user} = useAuthContext();

  function handleLogout(){
    localStorage.removeItem('user');
    dispatch({type: 'LOGOUT'})
  }

    return ( 
        
      <IconContext.Provider value={{ className: 'nav-logo'}}>
        <header className="nav-details">
          <div className="nav-grid">
            <IoChevronBackCircleOutline onClick={()=>history.goBack()} />
            <IoChevronForwardCircleOutline onClick={()=>history.goForward()} />
            
          </div>
          { user && <div className="nav-grid">
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