import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Getting credentials from .env
        const adminUser = process.env.REACT_APP_ADMIN_USERNAME;
        const adminPass = process.env.REACT_APP_ADMIN_PASSWORD;

        if (username === adminUser && password === adminPass) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin');
        } else {
            alert('Invalid Credentials!');
        }
    };

    return (
        <div className="login-page-body">
            <div className="ring">
                <i style={{ "--clr": "#00ff0a" }}></i>
                <i style={{ "--clr": "#ff0057" }}></i>
                <i style={{ "--clr": "#fffd44" }}></i>
                <form className="login-box" onSubmit={handleLogin}>
                    <h2>Admin Login</h2>
                    <div className="inputBx">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="inputBx">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="inputBx">
                        <input type="submit" value="Sign in" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;