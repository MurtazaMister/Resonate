import React, { useState } from 'react'
import "./uploadsong.css";
import Toggle from '../config/Toggle';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { Button} from 'react-bootstrap';
import axios from 'axios';


const UploadSong = () => {
  const [song, setSong] = useState();
  const [image, setImage] = useState();

  const upload_event = async (e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('song',song);
    axios.post('http://localhost:5000/songs/upload',formdata,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>{
      console.log(res);
    })
    formdata.delete('song');
    formdata.append('thumbnail',image);
    axios.post('http://localhost:5000/images/upload',formdata,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>{
      console.log(res);
    })

  }
  
  function onFileChange(e){
    console.log("------------------------We are in change");
    if(e.target.id=="thumbnail"){
      setImage(e.target.files[0]);
    }
    else{
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
        </div>
        <div className="right">
          <br/>
            <h3>Song title</h3>
            <input type="text" name="title"/>
            <br/><br/>
            <h3>Artists</h3>
            <input type="text" name="artist"/>
            <br/>
        </div>
      </div>
      <div className="bottom">
        <Toggle />
        <h3 className='bottom_2'>Attach music file&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BiMessageSquareAdd className='add'/></h3>
        <input type="file" name="song" id="song" onChange={onFileChange} />
      </div>
      <br/>
      <Button type="submit" variant="contained" className='upload'>Upload</Button>
    </form>
  )
}

export default UploadSong
