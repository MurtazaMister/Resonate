import React from 'react'
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi'

const Toggle=({isPublic, setPublic, isAnonymous, setAnonymous}) => {
    const handleChange = () => {
        return setPublic(!isPublic);
      };
    const handleChange_1 = () => {
        return setAnonymous(!isAnonymous);
      };

  return (
    <div style={{display:"block"}} className='content'>
      <h3 className='h_3'>Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public {isPublic ? <BiToggleLeft className='left_right' onClick={() => handleChange()}/> : <BiToggleRight className='left_right' onClick={() => handleChange()}/>} private</h3>
<br/>
      <h3 className='h_3'>Anonymous upload&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes {isAnonymous ? <BiToggleLeft className='left_right' onClick={() => handleChange_1()}/> : <BiToggleRight className='left_right' onClick={() => handleChange_1()}/>} No</h3>
      <br/>
    </div>
  )
}

export default Toggle
