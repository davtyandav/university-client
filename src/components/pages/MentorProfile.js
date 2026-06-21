import React, {useEffect, useState} from 'react';
import {getMentorById} from '../../services/api';
import {calculateAge} from '../../services/utils';
import Modal from "../Modal";
import MentorForm from "../mentor/MentorForm";
import LessonDescriptor from './LessonDescriptor';
import SalaryModal from './../SalaryModal';
import "../../styles/mentorprofile.css";

const MentorProfile = ({userId}) => {
    const [mentorData, setMentorData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

    const loadMentorData = () => {
        if (userId) {
            getMentorById(userId)
                .then(data => {
                    setMentorData(data);
                })
                .catch(err => {
                    console.error("Error loading mentor data:", err);
                    setError("Failed to load mentor data");
                });
        }
    };

    useEffect(() => {
        loadMentorData();
    }, [userId]);

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateSuccess = (updatedData) => {
        setMentorData(updatedData);
        handleCloseModal();
    };

    if (error) return <div className="p-5 text-center text-red-500">{error}</div>;
    if (!mentorData) return null;

    return (
        <div className="profile">
            <div className="flex gap-2">
                <button className="edit-button" onClick={handleOpenModal}>
                    ✏️ Edit profile
                </button>
                <button
                    className="edit-button bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setIsSalaryModalOpen(true)}
                >
                    💵 Calculate Salary
                </button>
            </div>

            <div className="mentor-profile-info">
                <div className="mentor-profile-card">
                    <h3>Date of Birth</h3>
                    <p>
                        {mentorData.birthDate ? mentorData.birthDate.split('T')[0] : "Not specified"}
                        {mentorData.birthDate && ` (${calculateAge(mentorData.birthDate)} years old)`}
                    </p>
                </div>

                <div className="info-card">
                    <h3>Active Courses</h3>
                    <p>{mentorData.lessonDescriptors?.length || 0}</p>
                </div>
            </div>

            <div className="lesson-group">
                <h2>My Teaching Groups</h2>
                {mentorData.lessonDescriptors && mentorData.lessonDescriptors.length > 0
                    ? (mentorData.lessonDescriptors.map((descriptor) => (
                        <LessonDescriptor key={descriptor.id} descriptor={descriptor}/>)))
                    : (<div className="empty">The mentor has no active descriptors yet</div>)}
            </div>

            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <MentorForm
                    mentor={mentorData}
                    onClose={handleCloseModal}
                    onSuccess={handleUpdateSuccess}
                />
            </Modal>

            <SalaryModal
                isOpen={isSalaryModalOpen}
                onClose={() => setIsSalaryModalOpen(false)}
                mentor={mentorData}
                isAdmin={false}
            />
        </div>
    );
};

export default MentorProfile;
