import React, {useEffect, useState} from 'react';
import {deleteStudent, getStudentById, getStudents} from '../../services/api';
import {calculateAge} from '../../services/utils';
import '../../styles/studentList.css';
import '../../styles/student.css';
import '../../styles/app.css';
import Modal from "../Modal";
import StudentForm from "./StudentForm";
import avatar from '../../assets/user.png';
import YearCalendar from "../caledar/YearCalendar";
import StudentCard from "./StudentCard";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    let {lessonDescriptor} = studentInfo?.lessonDescriptor || {};

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAddStudent = () => {
        setIsModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsModalOpen(false);
    };

    const updateStudent = (id) => {
        getStudentById(id)
            .then(currentStudent => {
                setEditingStudent(currentStudent)
                setIsEditModalOpen(true);
                fetchStudents();
            })
            .catch(error => {
                console.log(error)
            })
    };

    const openStudentInfo = (id) => {
        getStudentById(id)
            .then(currentStudent => {
                setStudentInfo(currentStudent)
                setIsInfoModalOpen(true);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleCloseInfoModal = (e) => {
        setIsInfoModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const fetchStudents = () => {
        getStudents()
            .then(data => {
                setStudents(data);
            })
            .catch(error => {
                console.log(error)
            })

    };

    const handleDelete = (id) => {
        deleteStudent(id)
            .then(res => {
                console.log(" deleted student id = " + id)
                fetchStudents();
            })
            .catch(error => {
                console.log(error)
            })

    };

    return (
        <div className="student-list">
            <h2>Students</h2>
            <button onClick={handleAddStudent}>Add Student</button>

            <div className="student-grid">
                {students.map((student) => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        onEdit={updateStudent}
                        onDelete={handleDelete}
                        onClick={openStudentInfo}
                    />
                ))}
            </div>
            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <StudentForm student={editingStudent} onClose={handleCloseModal}/>
            </Modal>

            <Modal isOpen={isModalOpen} onClose={handleCloseAddModal}>
                <StudentForm student={null} onClose={handleCloseAddModal}/>
            </Modal>

            {studentInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} width="1000px">
                    <div>
                        <img src={avatar} alt="User Avatar"/>
                        <div>Student: {studentInfo.name} {studentInfo.lastName}</div>
                        <div>Age: {calculateAge(studentInfo.birthDate)}</div>
                        <div>Email: {studentInfo.email}</div>
                        <div>Lesson
                            Type: {lessonDescriptor ? lessonDescriptor.type : "None"}</div>
                        <div>Mentor: {studentInfo.mentor ? studentInfo.mentor.name + " " + studentInfo.mentor.lastName : "None"}</div>
                        {lessonDescriptor && lessonDescriptor.lessons && (
                            <YearCalendar year={2025} lessons={lessonDescriptor.lessons}></YearCalendar>)}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default StudentList;
