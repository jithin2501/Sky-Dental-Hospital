import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const EyeIcon = ({ open }) => open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. Check Superadmin credentials from .env
        const superUser = process.env.REACT_APP_ADMIN_USERNAME;
        const superPass = process.env.REACT_APP_ADMIN_PASSWORD;

        if (username === superUser && password === superPass) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('userRole', 'Superadmin');
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
                localStorage.setItem('userRole', 'Admin');
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
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputBx password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {password && (
                            <button
                                type="button"
                                className="eye-toggle"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <EyeIcon open={showPassword} />
                            </button>
                        )}
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