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
import {Login} from './Page/Login';
import {Register} from './Page/Register';
import React, { createContext, useState } from 'react';
import {useAuthContext} from './hooks/useAuthContext';
import DisplayRoom from './Page/DisplayRoom';

const CurrentMusic = createContext();

function App() {

    const {user} = useAuthContext();
    const [currentMusic, setCurrentMusic] = useState(undefined);

    return ( 
        <Router >
        <ScrollToTop />
            <div className = "App" >            
                <NavBar />
                <SideBar />
                <CurrentMusic.Provider value={{currentMusic,setCurrentMusic}}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/search' component={SearchPg} />
                        <Route  path='/songs/:id' component={SongPage} />    

                        <Route exact path='/login' component={!user?Login:Home}/>
                        <Route exact path='/register' component={!user?Register:Home}/>

                        <Route exact path='/collection' component={user?Library:Login} />
                        <Route  path='/collection/tracks' component={user?LikedSongs:Login} />
                        <Route  path='/add' component={user?CreatePlaylist:Login} />
                        <Route  path='/upload' component={user?UploadSong:Login} />
                        <Route  path='/rooms' component={user?Room:Login} />
                        <Route  path='/host' component={user?Host:Login} />    
                        <Route  path='/displayroom' component={DisplayRoom} />  
                    </Switch>
                    <PlayBar />        
                </CurrentMusic.Provider>
            </div>
        </Router>
    );
}

export default App;
export {CurrentMusic}