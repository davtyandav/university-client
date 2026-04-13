import React from 'react';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import StudentList from "../student/StudentList";
import LessonList from "../lesson/LessonList";
import MentorList from "../mentor/MentorList";

const Admin = () => {
    return (
        <div className="w-full h-screen">
            <aside className="navbar">
                <NavLink to="/admin/students">Students</NavLink>
                <NavLink to="/admin/lessons">Lessons</NavLink>
                <NavLink to="/admin/mentors">Mentors</NavLink>
            </aside>
            <section className="panel">
                <div className="content">
                    <Routes>
                        <Route index element={<Navigate to="students"/>}/>
                        <Route path="students" element={<StudentList/>}/>
                        <Route path="lessons" element={<LessonList/>}/>
                        <Route path="mentors" element={<MentorList/>}/>
                    </Routes>
                </div>
            </section>
        </div>
    );
};

export default Admin;