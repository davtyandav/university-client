import React, { useEffect, useState } from 'react';
import { getStudentById } from '../../services/api';
import { calculateAge } from '../../services/utils';
import YearCalendar from "../caledar/YearCalendar";
import Modal from "../Modal";
import StudentEditModal from "../student/StudentEditModal";
import LessonInfoModal from "../lesson/LessonInfoModal"; // Импортируем модалку информации об уроке

const StudentProfile = ({ userId }) => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Новые стейты для управления модальным окном урока
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const loadStudentData = () => {
        if (userId) {
            setLoading(true);
            getStudentById(userId)
                .then(data => {
                    setStudentData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Ошибка загрузки данных студента:", err);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        loadStudentData();
    }, [userId]);

    // Функция обработки клика на урок в календаре
    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
        setIsLessonModalOpen(true);
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Загрузка данных...</div>;
    }

    if (!studentData) {
        return <div className="p-4 text-center text-red-500">Данные студента не найдены</div>;
    }

    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-gray-400 text-sm mb-2 font-medium uppercase">Дата рождения</h3>
                    <p className="font-semibold text-gray-700">
                        {studentData.birthDate ? studentData.birthDate.split('T')[0] : "Не указана"}
                        {studentData.birthDate && (
                            <span className="ml-2 text-blue-500 font-normal">
                                ({calculateAge(studentData.birthDate)} лет)
                            </span>
                        )}
                    </p>
                </div>

                <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-gray-400 text-sm mb-2 font-medium uppercase">Курс / Предмет</h3>
                    <p className="font-semibold text-gray-700">
                        {studentData.lessonDescriptor ? (
                            <span className="text-indigo-600">
                                {studentData.lessonDescriptor.type}: {studentData.lessonDescriptor.title}
                            </span>
                        ) : (
                            <span className="text-gray-400">Не назначен</span>
                        )}
                    </p>
                </div>

                <div
                    className="col-span-1 md:col-span-2 info-card bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                    <h3 className="text-blue-400 text-sm mb-3 font-medium uppercase">your mentor</h3>
                    {studentData.mentor ? (
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="font-bold text-gray-800">
                                    {studentData.mentor.user?.name} {studentData.mentor.user?.lastName}
                                </p>
                                <p className="text-sm text-blue-600">{studentData.mentor.user?.email}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Наставник пока не назначен</p>
                    )}
                </div>
            </div>

            <button
                className="edit-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleOpenModal}
            >
                ✏️ Edit Student
            </button>

            {/* Календарь занятий */}
            <div className="lessons-summary mt-6">
                <h4 className="font-semibold mb-2">Расписание:</h4>
                <YearCalendar
                    year={2026}
                    lessons={studentData.lessonDescriptor?.lessonInfo?.flatMap(info => info.lessons) || []}
                    onLessonClick={handleLessonClick} // <--- ПЕРЕДАЕМ НАШУ ФУНКЦИЮ СЮДА!
                />
            </div>

            {/* Модалка редактирования профиля студента */}
            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <StudentEditModal student={studentData} onClose={handleCloseModal}/>
            </Modal>

            {/* НОВАЯ МОДАЛКА: Детали занятия при клике на календарь */}
            <Modal
                isOpen={isLessonModalOpen}
                onClose={() => setIsLessonModalOpen(false)}
                width="500px"
            >
                {selectedLesson && studentData.lessonDescriptor && (
                    <div className="flex flex-col text-gray-800">
                        <div className="border-b pb-3 mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Информация о занятии</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Дата: <b>{new Date(selectedLesson.data).toLocaleDateString()}</b>
                            </p>
                            <p className="text-sm text-gray-500">
                                Статус:{' '}
                                <span
                                    className={selectedLesson.completed ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                                    {selectedLesson.completed ? "Завершен" : "Не завершен"}
                                </span>
                            </p>
                        </div>

                        <LessonInfoModal
                            onClose={() => setIsLessonModalOpen(false)}
                            params={{
                                descriptorId: studentData.lessonDescriptor?.id,
                                lessonId: selectedLesson.id
                            }}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default StudentProfile;