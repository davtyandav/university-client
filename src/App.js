import React from 'react';
import StudentList from './components/student/StudentList';
import LessonList from './components/LessonList';
import MentorList from './components/mentor/MentorList';
import './styles/app.css';
import {NavLink, Route, Routes} from "react-router-dom";

const App = () => {

    return (
        <div className="app-container">
            <nav className="navbar">
                <NavLink to="/students" className="nav-link" activeclassname="active">
                    Students
                </NavLink>
                <NavLink to="/lessons" className="nav-link" activeclassname="active">
                    Lessons
                </NavLink>
                <NavLink to="/mentors" className="nav-link" activeclassname="active">
                    Mentors
                </NavLink>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="/students" element={<StudentList/>}/>
                    <Route path="/lessons" element={<LessonList/>}/>
                    <Route path="/mentors" element={<MentorList/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default App;
