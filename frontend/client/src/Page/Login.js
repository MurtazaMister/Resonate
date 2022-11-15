import "./Login.css"
import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/login`, {
                password:pass,
                username,
            },{
                'Content-Type':'application/json'
            });
            localStorage.setItem('user',JSON.stringify(response.data));
            dispatch({type:'LOGIN',payload:response.data});
            
            setLoading(false);

        } catch (err) {
            setLoading(false);
            setError(JSON.parse(err.request.response).error);
        }

    }

    return (
        <div className="auth-form-container content" style={{border:0}}>
            <h2>Login</h2><br/>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Email</label>
                <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <br/>
                <button className="submit_btn" type="submit" disabled={loading}>Log In</button>
                {error && <div style={{color: "red",display: "flex",justifyContent: "center",alignItems: "center",marginTop: "10px",}}>{error}</div>}
            </form>
            <Link className="link-btn" to="/register">Don't have an account? Register here.</Link>
        </div>
    )
}