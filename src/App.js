import React from 'react';
import StudentList from './components/student/StudentList';
import LessonList from './components/lesson/LessonList';
import MentorList from './components/mentor/MentorList';
import { NavLink, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <div>


            {/* NAVBAR */}
            <nav className="navbar">
                <div className="p-4 "><img src="logo.png" alt="Logo" /></div>
                <NavLink to="/students" className="navlink">
                    Students
                </NavLink>

                <NavLink to="/lessons" className="navlink">
                    Lessons
                </NavLink>

                <NavLink to="/mentors" className="navlink">
                    Mentors
                </NavLink>

            </nav>

            {/* CONTENT */}

            <Routes>
                <Route path="/students" element={<StudentList />} />
                <Route path="/lessons" element={<LessonList />} />
                <Route path="/mentors" element={<MentorList />} />
            </Routes>


        </div>
    );
};

export default App;