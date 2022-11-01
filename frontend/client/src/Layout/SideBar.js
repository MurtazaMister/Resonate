import { IconContext  } from 'react-icons'
import { RiHomeFill,RiSearchLine } from 'react-icons/ri'
import { VscLibrary } from 'react-icons/vsc'
import { IoIosPeople } from 'react-icons/io'
import { MdAddBox } from 'react-icons/md'
import { FaUpload } from 'react-icons/fa'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { RiPlayListAddFill } from 'react-icons/ri'
import { NavLink } from "react-router-dom";
// import {logo} from './logo-name.svg';
import React from 'react';
import ReactDOM from "react-dom";


const SideBar = () => {
    return ( 
      <IconContext.Provider value={{ className: 'tile-logo'}}>
      
      <aside className="side-nav">
        {/* <img className="logo" src="https://raw.githubusercontent.com/mimansha-swarup/spotify-ui-clone/main/public/onspotbg.png" alt="logo" /> */}
        {/* <img className="logo" src={logo} alt="logo" /> */}
        <NavLink exact to='/'  className="nav-tile" activeClassName="active-now" > <RiHomeFill  /> <span> Home </span></NavLink>
        
        <NavLink to='/search' className="nav-tile" activeClassName="active-now" > <RiSearchLine /> <span> Search </span></NavLink>
        <NavLink exact to='/collection' className="nav-tile" activeClassName="active-now" > <VscLibrary  /> <span>Library </span></NavLink>
        <NavLink exact to='/rooms' className="nav-tile" activeClassName="active-now" > <IoIosPeople  /> <span>Rooms </span></NavLink>
        
        <hr />
        <NavLink to='/add' className="nav-tile hide" activeClassName="active-now" > <RiPlayListAddFill /> <span>Create Playlist</span> </NavLink>
        <NavLink to='/upload' className="nav-tile hide" activeClassName="active-now" > <MdAddBox /> <span>Upload songs</span> </NavLink>
        <NavLink to='/collection/tracks' className="nav-tile" activeClassName="active-now" > <FaUpload /> <span>Liked Songs</span> </NavLink>
        <NavLink to='/host' className="nav-tile" activeClassName="active-now" > <BsFillPersonPlusFill /> <span>Host a Party</span> </NavLink>
        <hr />

      </aside>
      
      
      
      </IconContext.Provider>
     );
}
 
export default SideBar;