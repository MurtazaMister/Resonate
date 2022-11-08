import React, { useState, useEffect } from 'react'
import "./uploadsong.css";
import Toggle from '../config/Toggle';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { Button} from 'react-bootstrap';
import axios from 'axios';
import checkFileDuration from '../utility/duration';
import { useAuthContext } from '../hooks/useAuthContext';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UploadSong = () => {
  const [song, setSong] = useState();
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState();
  const [title, setTitle] = useState('');
  const [artists, setArtists] = useState('');
  const [isAnonymous, setAnonymous] = useState(true);
  const [isPublic, setPublic] = useState(true);
  const [activator, setActivator] = useState({song:false,image:false});

  const [error_song, setSongError] = useState(false);
  const [error_image, setImageError] = useState(false);
  const [error_title, setTitleError] = useState(false);

  const [imageId, setImageId] = useState();
  const [songId, setSongId] = useState();
  
  const [imageName, setImageName] = useState((activator.image)?imageId:'');
  const [songName, setSongName] = useState((activator.song)?songId:'');

  const [load, setLoad] = useState(false);

  const {user} = useAuthContext();

  function cleanUp(){
    setImageName('');
    setSongName('');
    setImageId('');
    setSongId('');
    setTitle('');
    setArtists('');
    setImage();
    setSong();
    setDuration('');

    setTitleError(false);
    setImageError(false);
    setSongError(false);
  }

  useEffect(async ()=>{
    if(duration!=''){
      
    setLoad(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/music/upload`,{
          'thumbnail':imageId,
          'title':title,
          'artists':artists,
          'isPublic':isPublic,
          'isAnonymous':isAnonymous,
          'song':songId,
          'duration':duration,
        },{
          headers:{
            'Authorization': `Bearer ${user.token}`,
          },
        }).then(res=>{
          if(res.data.status=="success"){
            setActivator({song:false,image:false});
            setTitleError(false);
            cleanUp();
          }
          else{
            if(title.trim.length==0){
              setTitleError(true);
            }
            else{
              setTitleError(false);
            }
          }
        }).catch(err=>{
          if(title.trim.length==0){
            setTitleError(true);
          }
          else{
            setTitleError(false);
          }
        });
        setLoad(false);
    } catch (err) {
      setLoad(false);
    }
  
    }
  }, [duration])

  useEffect(()=>{
    if(imageId==undefined || songId==''){
      setActivator({...activator,image:false});
    }
    else{
      setActivator({...activator,image:true});
    }
  },[imageId]);
  
  useEffect(()=>{
    if(songId==undefined || songId==''){
      setActivator({...activator,song:false});
    }
    else{
      setActivator({...activator,song:true});
    }
  },[songId]);
  
  useEffect(()=>{
    // if(imageName!=""){
    //   document.getElementById('thumbnail').value = '';
    //   document.getElementById('imageIndicator').innerText = imageName;
    // }
    // else{
    //   document.getElementById('imageIndicator').innerText = imageName;
    // }
    document.getElementById('imageIndicator').innerText = imageName;
  },[imageName]);
  
  useEffect(()=>{
    // if(songName!=""){
    //   document.getElementById('song').value = '';
    //   document.getElementById('songIndicator').innerText = songName;
    // }
    // else{
    //   document.getElementById('songIndicator').innerText = songName;
    // }
    document.getElementById('songIndicator').innerText = songName;
  },[songName]);

  useEffect(()=>{

    if(activator.song && activator.image){

      // we have all the data ready to be uploaded
      

      // passing this data to the final upload
      final_upload();
      
    }

  },[activator]);

  const final_upload = async ()=>{
    checkFileDuration(document.getElementById('song').files[0],setDuration);
    document.getElementById('thumbnail').value = '';
    document.getElementById('song').value = '';
  }

  const upload_event = async (e)=>{
    e.preventDefault();

    if(activator.song && activator.image){
      setDuration('');
      final_upload();
    }
    else{
    const formdata = new FormData();
    formdata.append('song',song);
    
    if(activator.song==false){
      setLoad(true);
      try {
        let res_song = await axios.post(`${process.env.REACT_APP_SERVER}/songs/upload`,formdata,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`,
          }
        })
        setLoad(false);
        if(res_song.data.status == "success"){
          setSongError(false);
          await setSongName(res_song.data.filename);
          await setSongId(res_song.data.id);
        }
        else{
          setSongError(true);
          // setActivator({song:false,image:false});
          return;
        }
      } catch (err) {
        setLoad(false);
      }
    }
    

    formdata.delete('song');
    formdata.append('thumbnail',image);

    if(activator.image == false){
      setLoad(true);
      try {
        let res_image = await axios.post(`${process.env.REACT_APP_SERVER}/images/upload`,formdata,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`,
          }
        })
        setLoad(false);
        
        if(res_image.data.status == "success"){
          setImageError(false);
          await setImageName(res_image.data.filename);
          await setImageId(res_image.data.id);
        }
        else{
          setImageError(true);
          // setActivator({song:false,image:false});
          return;
        }
      } catch (err) {
        setLoad(false);
      }
    }
  }
  }
  
  function onFileChange(e){
    if(e.target.id=="thumbnail"){
      setActivator({...activator,image:false});
      setImage(e.target.files[0]);
    }
    else{
      setActivator({...activator,song:false});
      setSong(e.target.files[0]);
    }
  }

  return (
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={load}
      // onClick={handleClose}
    >
    <CircularProgress style={{position:"absolute"}} color="inherit" />
    </Backdrop>
    <form style={{opacity:((load)?0.2:1)}} enctype="multipart/form-data" onSubmit={upload_event} className="content">
      <h2>Brew your music</h2>
      <div>
        <div className="rectangle">
        <AiFillPlusCircle className='icon'/>
        <input type="file" name="thumbnail" id="thumbnail" onChange={onFileChange} />
        <span id="imageIndicator" style={{color:"white"}}></span>
        {error_image && <span style={{color:"red"}}>Error: Invalid file or filesize &#40;&lt;=2MB, reupload file&#41;</span>}
        </div>
        <div className="right">
          <br/>
            <h3>Song title</h3>
            <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            {error_title && <span style={{color:"red"}}>Invalid title</span>}
            <br/><br/>
            <h3>Artists</h3>
            <input type="text" name="artist" value={artists} onChange={(e)=>{setArtists(e.target.value)}} />
            <br/>
        </div>
      </div>
      <div className="bottom">
        <Toggle isPublic={isPublic} isAnonymous={isAnonymous} setPublic={setPublic} setAnonymous={setAnonymous} />
        {/* <Toggle/> */}
        <h3 className='bottom_2'>Attach music file&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BiMessageSquareAdd className='add'/></h3>
        <input type="file" name="song" id="song" onChange={onFileChange} />
        <span id="songIndicator" style={{color:"white"}}></span>
        {error_song && <span style={{color:"red"}}>Error: Invalid file or filesize &#40;&lt;=10MB, reupload file&#41;</span>}
      </div>
      <br/>
      <Button type="submit" variant="contained" className='upload'>Upload</Button>
    </form>
    {/* </Backdrop> */}
    </>
  )
}

export default UploadSong
