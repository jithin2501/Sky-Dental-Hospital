import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. Check Superadmin credentials from .env
        const superUser = process.env.REACT_APP_ADMIN_USERNAME;
        const superPass = process.env.REACT_APP_ADMIN_PASSWORD;

        if (username === superUser && password === superPass) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('userRole', 'Superadmin'); // Allows User Management access
            localStorage.setItem('username', username);
            navigate('/admin');
            return;
        }

        // 2. Check Database for regular Admins
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isAdminAuthenticated', 'true');
                localStorage.setItem('userRole', 'Admin'); // Redirected if trying to access /users
                localStorage.setItem('username', data.username);
                navigate('/admin');
            } else {
                alert(data.message || 'Invalid Credentials!');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert('Connection failed. Is the backend server running?');
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
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="inputBx">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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