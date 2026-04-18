import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserList from "./components/user/UserList";
import Profile from "./components/pages/Profile";


const App = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    console.log(localStorage)
    const handleLoginSuccess = () => {
        const savedToken = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role');

        console.log("Login Success! Updating App state:", { savedToken, savedRole });

        setToken(savedToken);
        setRole(savedRole);
    };

    const handleLogout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
        navigate("/login");
    };

    // Лог для отладки
    useEffect(() => {
        console.log("Render App - Current Role:", role);
    }, [role, token]);

    const isAdmin = role === 'ADMIN' || role === 'ADMIN';

    const isManager = role === 'MANAGER' || role === 'MANAGER';

    return (
        <div className="app-wrapper">
            <header >
                <div className="header-left">
                    <div className="logo">
                        <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
                    </div>
                    <nav className="header-nav">
                        <NavLink to="/">Home</NavLink>

                        {isAdmin && (
                            <NavLink to="/admin">Admin Panel</NavLink>
                        )}

                        {<NavLink to="/users">Users List</NavLink>}
                    </nav>
                </div>

                <div className="header-right">
                    {token ? (
                        <>
                            {isAdmin && (
                                <NavLink to="/register" style={{ marginRight: '15px' }}>Register User</NavLink>
                            )}
                            <NavLink to="/profile">My Profile</NavLink>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                        </>
                    )}
                </div>
            </header>

            <main className="content pt-40">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/login"
                        element={<Login onLoginSuccess={handleLoginSuccess} />}
                    />

                    <Route
                        path="/register"
                        element={isAdmin ? <Register /> : <Navigate to="/" />}
                    />

                    <Route
                        path="/profile"
                        element={token ? <Profile /> : <Navigate to="/login" />}
                    />

                    <Route
                        path="/admin/*"
                        element={isAdmin ? <Admin /> : <Navigate to="/" />}
                    />

                    <Route
                        path="/users/*"
                        element={<UserList />}
                    />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;