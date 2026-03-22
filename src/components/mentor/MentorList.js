import React, { useEffect, useState } from 'react';
import Modal from "../Modal";
import avatar from '../../assets/user.png';
import MentorCard from "./MentorCard";
import MentorForm from "./MentorForm";
import { deleteMentor, getMentorById, getMentors } from '../../services/api';
import '../../styles/list.css';
import { calculateAge } from '../../services/utils';

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
                        <img src={avatar} alt="User Avatar" />
                        <div>{mentorInfo.name} {mentorInfo.lastName}</div>
                        <div>Email: {mentorInfo.email}</div>
                        <div>birthDate: {calculateAge(mentorInfo.birthDate)}</div>
                        <div>Students
                            Assigned: {mentorInfo.students?.map(s => s.name + ' ' + s.lastName).join(', ') || 'None'}</div>
                        <div>Lesson
                            info: {mentorInfo.lessonDescriptors?.map(s => s.type + ' ' + s.title).join(', ') || 'None'}</div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MentorList;
