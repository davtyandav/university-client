import React, { useState } from 'react';
import avatar from '../../assets/user.png';
import { calculateAge, isBirthDate } from '../../services/utils';
import YearCalendar from "../caledar/YearCalendar";
import Modal from "../Modal";
import LessonInfoModal from "../lesson/LessonInfoModal";

const StudentInfo = ({ studentInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    if (!studentInfo) return null;

    const { lessonDescriptor } = studentInfo;

    const handleLessonClick = (lesson) => {

        console.log("Клик в StudentInfo. lesson:", lesson);
        console.log("Дескриптор студента:", lessonDescriptor);
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Секция профиля */}
            <div className="flex items-start mb-6">
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-20 h-20 rounded-full border-2 border-gray-200"
                />

                <div className="flex-1 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold text-center">
                        {studentInfo.user?.name} {studentInfo.user?.lastName}
                    </h2>
                    <p className="text-gray-400 text-sm text-center">
                        {calculateAge(studentInfo.birthDate)} years old
                    </p>
                    <p className="text-sm mt-1">
                        {isBirthDate(studentInfo.birthDate) ? "🎉 Сегодня день рождения!" : ""}
                    </p>
                </div>
            </div>

            {/* Детальная информация */}
            <div className="border rounded-2xl divide-y mt-6 bg-white">
                <div className="flex justify-between items-center p-4">
                    <span className="text-gray-500">Email</span>
                    <div className="flex items-center gap-2">
                        <span>{studentInfo.user?.email}</span>
                        <span className="text-gray-300">›</span>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4">
                    <span className="text-gray-500">Lesson Info</span>
                    <div className="flex items-center gap-2">
                        <span>
                            {lessonDescriptor
                                ? `${lessonDescriptor.type} ${lessonDescriptor.title}`
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
                                ? `${studentInfo.mentor.user?.name} ${studentInfo.mentor.user?.lastName}`
                                : "None"}
                        </span>
                        <span className="text-gray-300">›</span>
                    </div>
                </div>
            </div>

            {/* Календарь занятий */}
            <div className="lessons-summary mt-6">
                <h4 className="font-semibold mb-2">Расписание:</h4>
                <YearCalendar
                    year={2026}
                    lessons={lessonDescriptor?.lessonInfo?.flatMap(info => info.lessons) || []}
                    onLessonClick={handleLessonClick}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="500px"
            >
                {selectedLesson && lessonDescriptor && (
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
                            onClose={() => setIsModalOpen(false)}
                            params={{
                                descriptorId: lessonDescriptor?.id,
                                lessonId: selectedLesson.id
                            }}
                        />
                    </div>
                )}
            </Modal>
        </>
    );
};

export default StudentInfo;
