import React, { useState, useEffect } from 'react'
import "./uploadsong.css";
import Toggle from '../config/Toggle';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { Button} from 'react-bootstrap';
import axios from 'axios';


const UploadSong = () => {
  const [song, setSong] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [artists, setArtists] = useState();
  const [isAnonymous, setAnonymous] = useState(true);
  const [isPublic, setPublic] = useState(true);
  const [activator, setActivator] = useState({song:false,image:false});

  const [error_song, setSongError] = useState(false);
  const [error_image, setImageError] = useState(false);

  const [imageId, setImageId] = useState();
  const [songId, setSongId] = useState();

  useEffect(()=>{
    setActivator({...activator,image:true});
  },[imageId]);
  
  useEffect(()=>{
    setActivator({...activator,song:true});
  },[songId]);

  useEffect(()=>{
    if(activator.song && activator.image){

      // we have all the data ready to be uploaded
      

      // passing this data to the final upload
      axios.post('http://localhost:5000/music/upload',{
        'thumbnail':imageId,
        'title':title,
        'artists':artists,
        'isPublic':true, // formdata.append('isPublic',isPublic);
        'isAnonymous':true, // formdata.append('isAnonymous',isAnonymous);
        'song':songId,
      },{}).then(res=>{
        
      });
      setActivator({song:false,image:false});
    }
  },[activator]);

  const upload_event = async (e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('song',song);
    
    if(activator.song==false){
      let res_song = await axios.post('http://localhost:5000/songs/upload',formdata,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if(res_song.data.status == "success"){
        setSongError(false);
        await setSongId(res_song.data.id);
      }
      else{
        setSongError(true);
        setActivator({song:false,image:false});
        return;
      }
    }
    

    formdata.delete('song');
    formdata.append('thumbnail',image);

    if(activator.image == false){
      let res_image = await axios.post('http://localhost:5000/images/upload',formdata,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if(res_image.data.status == "success"){
        setImageError(false);
        await setImageId(res_image.data.id);
      }
      else{
        setImageError(true);
        setActivator({song:false,image:false});
        return;
      }
    }

  }
  
  function onFileChange(e){
    if(e.target.id=="thumbnail"){
      setActivator({...activator,song:false});
      setImage(e.target.files[0]);
    }
    else{
      setActivator({...activator,image:false});
      setSong(e.target.files[0]);
    }
  }

  return (
    <form enctype="multipart/form-data" onSubmit={upload_event} className="content">
      <h2>Brew your music</h2>
      <div>
        <div className="rectangle">
        <AiFillPlusCircle className='icon'/>
        <input type="file" name="thumbnail" id="thumbnail" onChange={onFileChange} />
        {error_image && <span style={{color:"red"}}>Error: Invalid file or filesize &#40;&lt;=2MB, reupload file&#41;</span>}
        </div>
        <div className="right">
          <br/>
            <h3>Song title</h3>
            <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}} />
            <br/><br/>
            <h3>Artists</h3>
            <input type="text" name="artist" onChange={(e)=>{setArtists(e.target.value)}} />
            <br/>
        </div>
      </div>
      <div className="bottom">
        <Toggle isPublic={isPublic} isAnonymous={isAnonymous} setPublic={setPublic} setAnonymous={setAnonymous} />
        {/* <Toggle/> */}
        <h3 className='bottom_2'>Attach music file&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BiMessageSquareAdd className='add'/></h3>
        <input type="file" name="song" id="song" onChange={onFileChange} />
        {error_song && <span style={{color:"red"}}>Error: Invalid file or filesize &#40;&lt;=10MB, reupload file&#41;</span>}
      </div>
      <br/>
      <Button type="submit" variant="contained" className='upload'>Upload</Button>
    </form>
  )
}

export default UploadSong
