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
    const [name, setName] = useState(() => localStorage.getItem('userName') || "");
    const [lastName, setLastName] = useState(() => localStorage.getItem('userLastName') || "");

    console.log(localStorage)
    const handleLoginSuccess = () => {
        const savedToken = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role');
        const savedName = localStorage.getItem('userName');
        const savedLastName = localStorage.getItem('userLastName');

        console.log("Login Success! Updating App state:", {savedToken, savedRole, savedName, savedLastName});

        setToken(savedToken);
        setRole(savedRole);
        setName(savedName);
        setLastName(savedLastName);
    };

    const handleLogout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
        setName(null);
        setLastName(null);
        navigate("/login");
    };

    useEffect(() => {
        console.log("Render App - Current Role:", role);
    }, [role, token]);

    useEffect(() => {
        console.log("Current user data:", {name, lastName});
    }, [name, lastName]);

    const isAdmin = role === 'ADMIN' || role === 'ADMIN';

    const isManager = role === 'MANAGER' || role === 'MANAGER';

    const getInitials = (name, lastName) => {
        const first = name ? name.charAt(0).toUpperCase() : '';
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return first + last;
    };

    const getRandomColor = (seed) => {
        const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];
        const charCodeSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[charCodeSum % colors.length];
    };

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
                            <NavLink to="/profile">
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm border-2 border-white/20"
                                    style={{backgroundColor: getRandomColor(name + lastName)}}
                                >
                                    {getInitials(name, lastName)}
                                </div>
                            </NavLink>
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