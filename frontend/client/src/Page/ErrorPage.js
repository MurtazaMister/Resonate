import React from 'react'
import './displayRoom.css'

const ErrorPage = ()=>{
    return (
        <div className="body" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h4>404 - Page not found</h4>
            <h6>Make sure you've entered a valid URL</h6>
        </div>
    )
}

export default ErrorPage;