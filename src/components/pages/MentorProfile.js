import React, {useEffect, useState} from 'react';
import {getMentorById} from '../../services/api';
import {calculateAge} from '../../services/utils';
import Modal from "../Modal";
import MentorForm from "../mentor/MentorForm";
import YearCalendar from "../caledar/YearCalendar";

const MentorProfile = ({userId}) => {
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
        <div className="w-full space-y-6">

            <div className="pt-4">
                <button
                    className="edit-button bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                    onClick={handleOpenModal}
                >
                    ✏️ Edit profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-gray-400 text-sm mb-2 font-medium">Дата рождения</h3>
                    <p className="font-semibold text-gray-700">
                        {mentorData.birthDate ? mentorData.birthDate.split('T')[0] : "Не указана"}
                        {mentorData.birthDate && ` (${calculateAge(mentorData.birthDate)} лет)`}
                    </p>
                </div>

                <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-gray-400 text-sm mb-2 font-medium">Активных курсов</h3>
                    <p className="font-semibold text-gray-700 text-xl">
                        {mentorData.lessonDescriptors?.length || 0}
                    </p>
                </div>

            </div>

            {/* СЕКЦИЯ КУРСОВ И СТУДЕНТОВ */}
            <div className="space-y-6 mt-8">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Мои учебные группы</h2>

                {mentorData.lessonDescriptors && mentorData.lessonDescriptors.length > 0 ? (
                    mentorData.lessonDescriptors.map((descriptor) => (
                        <div key={descriptor.id}
                             className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            {/* Заголовок дескриптора */}
                            <div className="bg-blue-600 p-3 text-white flex justify-between items-center">
                                <span className="font-bold uppercase text-sm tracking-wide">
                                    {descriptor.type}: {descriptor.title}
                                </span>
                                <span className="text-xs opacity-80">{descriptor.dayType}</span>
                            </div>

                            {/* Список студентов этого конкретного дескриптора */}
                            <div className="p-4">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Список студентов:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {descriptor.studentResponses && descriptor.studentResponses.length > 0 ? (
                                        descriptor.studentResponses.map((student) => (
                                            <div key={student.id}
                                                 className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 transition hover:border-blue-300">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                                                    {student.user?.name?.[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {student.user?.name} {student.user?.lastName}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 truncate w-32 md:w-full">
                                                        {student.user?.email}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm italic py-2">На этот курс студенты не
                                            назначены</p>
                                    )}
                                </div>
                                <div className="lessons-summary mt-6">
                                    <h4 className="font-semibold mb-2">Расписание:</h4>
                                    <YearCalendar
                                        year={2026}
                                        lessons={descriptor?.lessonInfo?.flatMap(info => info.lessons) || []}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-400 border-2 border-dashed rounded-2xl italic">
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