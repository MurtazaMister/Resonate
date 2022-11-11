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
import ErrorPage from './Page/ErrorPage';
import ComingSoon from './Page/ComingSoon';
import Room from './Page/Room';
import Host from './Page/Host';
import {Login} from './Page/Login';
import {Register} from './Page/Register';
import React, { createContext, useState } from 'react';
import {useAuthContext} from './hooks/useAuthContext';
import DisplayRoom from './Page/DisplayRoom';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

const CurrentMusic = createContext();
const CurrentRoom = createContext();
const CurrentQueue = createContext();
const Socket = createContext();

function App() {

    const {user} = useAuthContext();
    const [currentMusic, setCurrentMusic] = useState(undefined);
    const [currentRoom, setCurrentRoom] = useState();
    const [currentQueue, setCurrentQueue] = useState();

    return ( 
        <Router >
        <ScrollToTop />
            <div className = "App" >
                <Socket.Provider value={socket}>
                <CurrentRoom.Provider value={{currentRoom, setCurrentRoom}}>
                    <CurrentQueue.Provider value={{currentQueue, setCurrentQueue}}>
                    <NavBar />
                    <SideBar />
                    <CurrentMusic.Provider value={{currentMusic,setCurrentMusic}}>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/search' component={SearchPg} /> 

                            <Route exact path='/login' component={!user?Login:Home}/>
                            <Route exact path='/register' component={!user?Register:Home}/>
                            {/* Library */}
                            <Route exact path='/collection' component={user?ComingSoon:Login} />
                            {/* LikedSongs */}
                            <Route  path='/collection/tracks' component={user?ComingSoon:Login} />
                            {/* CreatePlaylist */}
                            <Route  path='/add' component={user?ComingSoon:Login} />
                            <Route  path='/upload' component={user?UploadSong:Login} />
                            <Route  path='/rooms' component={user?Room:Login} />
                            <Route  path='/host' component={user?Host:Login} />    
                            <Route  path='/room' component={user?DisplayRoom:Login} />  
                            <Route  path='/upgrade' component={user?ComingSoon:Login} />  
                            <Route  path='*' component={ErrorPage} />  
                        </Switch>
                        <PlayBar />        
                    </CurrentMusic.Provider>
                    </CurrentQueue.Provider>
                </CurrentRoom.Provider>
                </Socket.Provider>
            </div>
        </Router>
    );
}

export default App;
export {CurrentMusic, CurrentRoom, CurrentQueue, Socket};