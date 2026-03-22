import React, { useEffect, useState } from 'react';
import { deleteStudent, getStudentById, getStudents } from '../../services/api';
import { calculateAge } from '../../services/utils';
import Modal from "../Modal";
import StudentForm from "./StudentForm";
import avatar from '../../assets/user.png';
import YearCalendar from "../caledar/YearCalendar";
import StudentCard from "./StudentCard";
import '../../styles/list.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    let lessonDescriptor = studentInfo?.lessonDescriptor;

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAddStudent = () => {
        setIsModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsModalOpen(false);
        fetchStudents();
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
        <div className="panel">
            <div className="p-5 m-5 bg-white">Students</div>
            <div className="p-2 m-5 bg-white">
                <button className="btn btn-primary p-2 bg-blue-900 text-white " onClick={handleAddStudent}>
                    Add Student
                </button>

                <div className="list">
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
            </div>

            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <StudentForm student={editingStudent} onClose={handleCloseModal} />
            </Modal>

            <Modal isOpen={isModalOpen} onClose={handleCloseAddModal}>
                <StudentForm student={null} onClose={handleCloseAddModal} />
            </Modal>

            {studentInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal}>
                    <div className="flex items-start mb-6">
                        <img
                            src={avatar}
                            alt="avatar"
                            className="w-20 h-20 rounded-full border-2 border-gray-200"
                        />

                        <div className="flex-1 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-semibold text-center">
                                {studentInfo.name} {studentInfo.lastName}
                            </h2>
                            <p className="text-gray-400 text-sm text-center">
                                {calculateAge(studentInfo.birthDate)} years old
                            </p>
                        </div>
                    </div>

                    <div className="border rounded-2xl divide-y mt-6">

                        <div className="flex justify-between items-center p-4">
                            <span className="text-gray-500">Email</span>
                            <div className="flex items-center gap-2">
                                <span>{studentInfo.email}</span>
                                <span className="text-gray-300">›</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4">
                            <span className="text-gray-500">Lesson Info</span>
                            <div className="flex items-center gap-2">
                                <span>
                                    {lessonDescriptor
                                        ? lessonDescriptor.type + " " + lessonDescriptor.title
                                        : "None"}
                                </span>
                                <span className="text-gray-300">›</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4">
                            <span className="text-gray-500">Mentor</span>
                            <div className="flex items-center gap-2">
                                <span>
                                    {studentInfo.mentor
                                        ? studentInfo.mentor.name + " " + studentInfo.mentor.lastName
                                        : "None"}
                                </span>
                                <span className="text-gray-300">›</span>
                            </div>
                        </div>

                    </div>

                    {lessonDescriptor && lessonDescriptor.lessonInfo && (
                        <div className="lessons-summary">
                            <h4>Расписание:</h4>
                            <YearCalendar
                                year={2026}
                                lessons={lessonDescriptor.lessonInfo.flatMap(info => info.lessons)}
                            />
                        </div>
                    )}
                </Modal>
            )}
        </div >
    );
};

export default StudentList;
