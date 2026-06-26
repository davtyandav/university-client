import React, { useEffect, useState } from 'react';
import { getStudentByUserId, getUsersByRole } from '../../services/api';
import Modal from "../Modal";
import StudentCard from "./StudentCard";
import SearchInput from '../../customComponents/SearchInput';
import '../../styles/app.css';
import StudentInfo from "./StudentInfo";

const StudentList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentInfo, setStudentInfo] = useState(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const openStudentInfo = (id) => {
        getStudentByUserId(id)
            .then(currentStudent => {
                setStudentInfo(currentStudent)
                setIsInfoModalOpen(true);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const fetchStudents = () => {
        getUsersByRole("STUDENT")
            .then(data => {
                console.log("students list", data)
                setUsers(data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        return (
            user.name?.toLowerCase().includes(search) ||
            user.lastName?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="w-full">
            <div className="mx-5 mt-5">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search students by name, last name, or email..."
                />
            </div>

            <div className="p-2 m-5 bg-white rounded shadow-sm">
                {filteredUsers.length > 0 ? (
                    <div className="list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {filteredUsers.map((user) => (
                            <StudentCard
                                key={user.id}
                                user={user}
                                onClick={openStudentInfo}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No students found
                    </div>
                )}
            </div>

            {studentInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} width="1000px">
                    <StudentInfo studentInfo={studentInfo}/>
                </Modal>
            )}
        </div>
    );
};

export default StudentList;
