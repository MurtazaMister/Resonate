import React, { useState } from "react";
import "./Register.css"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container_r content">
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
            <button className="submit_btn" type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}