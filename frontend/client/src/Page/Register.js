import React, { useState } from "react";
import "./Register.css";
import { NavLink as Link, Redirect } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext()

    const [signedUp, setSignedUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/signup`, {
                email,
                password:pass,
                first_name: firstName,
                last_name: lastName,
                username,
            },{
                'Content-Type':'application/json'
            });
            localStorage.setItem('user',JSON.stringify(response.data));
            dispatch({type:'LOGIN',payload:response.data});
            
            setLoading(false);
            setSignedUp(true);

        } catch (err) {
            setLoading(false);
            setError(JSON.parse(err.request.response).error);
        }

    }

    return (
        <div className="auth-form-container_r content">
            {signedUp && <Redirect to="/" />}
            <h2>Register</h2><br/>
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
            <input value={username} onChange={(e) => setUsername(e.target.value)}name="username" id="username" placeholder="User Name" /></div>
            

            <div className="col">
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Email" id="email" name="email" /></div>
            
            </div>
            <div className="row">
            <div className="col">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}name="firstname" id="firstname" placeholder="First Name" /></div>

            <div className="col">
            <input value={lastName} onChange={(e) => setLastName(e.target.value)}name="lastname" id="lastname" placeholder="Last Name" /></div>

            </div>
            


            
            <div className="row">
            <div className="col">
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" /></div></div>
            <br/>
            <button className="submit_btn" type="submit" disabled={loading}>Register</button>
            {error && <div style={{color: "red",display: "flex",justifyContent: "center",alignItems: "center",marginTop: "10px",}}>{error}</div>}
        </form>
        <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
    </div>
    )
}