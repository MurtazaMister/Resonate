import React from 'react'
import "./uploadsong.css";
import Toggle from '../config/Toggle';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { Button} from 'react-bootstrap';

const UploadSong = () => {
  return (
    <div className="content">
      <h2>Brew your music</h2>
      <div>
        <div className="rectangle">
        <AiFillPlusCircle className='icon'/>
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
      </div>
      <br/>
      <Button variant="contained" className='upload'>Upload</Button>
    </div>
  )
}

export default UploadSong
