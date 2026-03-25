import React, { useEffect, useState } from 'react';
import Modal from "../Modal";
import avatar from '../../assets/user.png';
import MentorCard from "./MentorCard";
import MentorForm from "./MentorForm";
import { deleteMentor, getMentorById, getMentors } from '../../services/api';
import '../../styles/list.css';
import { isBirthDate, calculateAge } from '../../services/utils';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMentor, setEditingMentor] = useState(null);
    const [mentorInfo, setMentorInfo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleAddMentor = () => {
        setIsModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsModalOpen(false);
        fetchMentors();
    };

    const updateMentor = (id) => {
        getMentorById(id)
            .then(currentMentor => {
                setEditingMentor(currentMentor)
                setIsEditModalOpen(true);
                fetchMentors();
            })
            .catch(error => {
                console.log(error)
            })
    };

    const openMentorInfo = (id) => {
        getMentorById(id)
            .then(currentMentor => {
                setMentorInfo(currentMentor)
                setIsInfoModalOpen(true);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const fetchMentors = () => {
        getMentors()
            .then(data => {
                setMentors(data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleDelete = (id) => {
        deleteMentor(id)
            .then(() => {
                console.log("Deleted mentor id = " + id);
                fetchMentors();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="panel">
            <h2>Mentors</h2>
            <button onClick={handleAddMentor}>Add Mentor</button>

            <div className="list">
                {mentors.map((mentor) => (
                    <MentorCard
                        key={mentor.id}
                        mentor={mentor}
                        onEdit={updateMentor}
                        onDelete={handleDelete}
                        onClick={openMentorInfo}
                    />
                ))}
            </div>

            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <MentorForm mentor={editingMentor} onClose={handleCloseModal} />
            </Modal>

            <Modal isOpen={isModalOpen} onClose={handleCloseAddModal}>
                <MentorForm mentor={null} onClose={handleCloseAddModal} />
            </Modal>

            {mentorInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} width="600px">
                    <div>
                        <div className="flex items-start mb-6">
                            <img
                                src={avatar}
                                alt="avatar"
                                className="w-20 h-20 rounded-full border-2 border-gray-200"
                            />

                            <div className="flex-1 flex flex-col justify-center items-center">
                                <h2 className="text-xl font-semibold text-center">
                                    {mentorInfo.name} {mentorInfo.lastName}
                                </h2>
                                <p className="text-gray-400 text-sm text-center">
                                    {calculateAge(mentorInfo.birthDate)} years old
                                </p>
                                <p>{isBirthDate(mentorInfo.birthDate) ? "ha cnundas" : "cnunds chi"}</p>
                            </div>
                        </div>

                        <div className="border rounded-2xl divide-y mt-6">

                            <div className="flex justify-between items-center p-4">
                                <span className="text-gray-500">Email</span>
                                <div className="flex items-center gap-2">
                                    <span>{mentorInfo.email}</span>
                                    <span className="text-gray-300">›</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4">
                                <span className="text-gray-500">Lesson Info</span>
                                <div className="flex items-center gap-2">
                                    <span>
                                        {mentorInfo.lessonDescriptors
                                            ? mentorInfo.lessonDescriptors[0].type + " " + mentorInfo.lessonDescriptors[0].title
                                            : "None"}
                                    </span>
                                    <span className="text-gray-300">›</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col p-4">
                            <span className="text-gray-500 mb-2">Students</span>
                            <div className="flex flex-col gap-2">
                                {mentorInfo.students && mentorInfo.students.length > 0 ? (
                                    mentorInfo.students.map((student, index) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                            <span>{student.name + " " + student.lastName}</span>
                                            <span className="text-gray-300">›</span>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-gray-400">None</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MentorList;
