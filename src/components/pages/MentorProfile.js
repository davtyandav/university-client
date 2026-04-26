import React, { useEffect, useState } from 'react';
import { getMentorById } from '../../services/api';
import { calculateAge } from '../../services/utils';
import Modal from "../Modal";
import MentorForm from "../mentor/MentorForm";
import YearCalendar from "../caledar/YearCalendar";
import LessonDescriptor from './LessonDescriptor';
import "./mentorprofile.css"

const MentorProfile = ({ userId }) => {
    const [mentorData, setMentorData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const loadMentorData = () => {
        if (userId) {
            getMentorById(userId)
                .then(data => {
                    setMentorData(data);
                })
                .catch(err => {
                    console.error("Ошибка загрузки данных ментора:", err);
                    setError("Не удалось загрузить данные ментора");
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

            <button
                className="edit-button"
                onClick={handleOpenModal}
            >
                ✏️ Edit profile
            </button>

            <div className="mentor-profile-info">
                <div className="mentor-profile-card ">
                    <h3 >Дата рождения</h3>
                    <p >


                        {mentorData.birthDate ? mentorData.birthDate.split('T')[0] : "Не указана"}
                        {mentorData.birthDate && ` (${calculateAge(mentorData.birthDate)} лет)`}
                    </p>
                </div>

                <div className="info-card">
                    <h3 >Активных курсов</h3>
                    <p >
                        {mentorData.lessonDescriptors?.length || 0}
                    </p>
                </div>

            </div>

            <div className="lesson-group" >

                <h2 >Мои учебные группы</h2>

                {
                mentorData.lessonDescriptors && mentorData.lessonDescriptors.length > 0 ? (
                    mentorData.lessonDescriptors.map((descriptor) => (
                        <LessonDescriptor descriptor={descriptor} />
                    ))
                ) : (
                    <div className="empty">
                        У ментора пока нет активных дескрипторов
                    </div>
                )}
            </div>

            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <MentorForm
                    mentor={mentorData}
                    onClose={handleCloseModal}
                    onSuccess={handleUpdateSuccess}
                />
            </Modal>
        </div>
    );
};

export default MentorProfile;
