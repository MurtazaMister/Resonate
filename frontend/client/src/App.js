import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Page/Home";
import NavBar from "./Layout/NabBar";
import PlayBar from "./Layout/PlayBar";
import SideBar from "./Layout/SideBar";
import SearchPg from './Page/searchpg';
import ScrollToTop from './config/ScrollToTop';
import Library from './Page/Library';
import LikedSongs from './Page/Liked';
import SongPage from './Page/SongPage';
import CreatePlaylist from './Page/CreatePlaylist';
import UploadSong from './Page/UploadSong';
import Room from './Page/Room';
import Host from './Page/Host';
import React from 'react';
import ReactDOM from "react-dom";

// Main application
//comment acknowledged
function App() {
    return ( 
        <Router >
        <ScrollToTop />
            <div className = "App" >            
                <NavBar />
                <SideBar />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/search' component={SearchPg} />
                    <Route exact path='/collection' component={Library} />
                    <Route  path='/collection/tracks' component={LikedSongs} />
                    <Route  path='/add' component={CreatePlaylist} />
                    <Route  path='/songs/:id' component={SongPage} />    
                    <Route  path='/upload' component={UploadSong} />
                    <Route  path='/rooms' component={Room} />
                    <Route  path='/host' component={Host} />    
                </Switch>
                <PlayBar />        
                
            </div>
        </Router>
    );
}

export default App;