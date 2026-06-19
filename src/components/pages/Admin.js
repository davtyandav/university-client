import React, {useEffect, useState} from 'react';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import StudentList from "../student/StudentList";
import LessonListDescriptors from "../lesson/LessonListDescriptors";
import MentorList from "../mentor/MentorList";
import DescriptorToolbar from "./DescriptorToolbar";
import {getLessonDescriptors} from "../../services/api";

const Admin = () => {
    const [lessonsDescriptor, setLessonsDescriptor] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLessons = () => {
        setLoading(true);
        getLessonDescriptors()
            .then(data => {
                setLessonsDescriptor(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    if (loading) return <div className="p-5">Загрузка данных админ-панели...</div>;

    return (
        <div className="w-full h-screen">
            <aside className="navbar">
                <NavLink to="/admin/students">Students</NavLink>
                <NavLink to="/admin/lessonDescriptors">Lesson Descriptors</NavLink>
                <NavLink to="/admin/mentors">Mentors</NavLink>
                <NavLink to="/admin/toolBar">Tool bar</NavLink>
            </aside>
            <section className="panel">
                <div className="content">
                    <Routes>
                        <Route index element={<Navigate to="students"/>}/>
                        <Route path="students" element={<StudentList/>}/>
                        <Route path="lessonDescriptors" element={
                            <LessonListDescriptors descriptors={lessonsDescriptor} onRefresh={fetchLessons}/>}/>
                        <Route path="mentors" element={<MentorList/>}/>

                        <Route path="toolBar" element={
                            <DescriptorToolbar descriptors={lessonsDescriptor} onRefresh={fetchLessons}/>}/>
                    </Routes>
                </div>
            </section>
        </div>
    );
};

export default Admin;