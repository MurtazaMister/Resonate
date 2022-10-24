import React from 'react'
import { useState } from 'react';
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi'


const Toggle=() => {
    //ispublic = true -> song mode is public
    //ispublic = false -> song mode is private
    const [ispublic, setPublic] = useState(true);

    //isanonymous = true -> it is an anonymous upload
    //isanonymous = false -> it is not an anonymous upload
    const [isanonymous, setAnonymous] = useState(true);
    
    const handleChange = () => {
        return setPublic(!ispublic);
      };
    const handleChange_1 = () => {
        return setAnonymous(!isanonymous);
      };

  return (
    <div className='content'>
      <h3 className='h_3'>Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public {ispublic ? <BiToggleLeft className='left_right' onClick={() => handleChange()}/> : <BiToggleRight className='left_right' onClick={() => handleChange()}/>} private</h3>
<br/>
      <h3 className='h_3'>Anonymous upload&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes {isanonymous ? <BiToggleLeft className='left_right' onClick={() => handleChange_1()}/> : <BiToggleRight className='left_right' onClick={() => handleChange_1()}/>} No</h3>
      <br/>
    </div>
  )
}

export default Toggle
