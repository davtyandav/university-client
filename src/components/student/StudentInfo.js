import React, {useState} from 'react';
import avatar from '../../assets/user.png';
import {calculateAge, isBirthDate} from '../../services/utils';
import YearCalendar from "../caledar/YearCalendar";
import Modal from "../Modal";
import LessonInfoModal from "../lesson/LessonInfoModal";

const StudentInfo = ({studentInfo}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    if (!studentInfo) return null;

    const {lessonDescriptor} = studentInfo;

    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col text-left w-full relative">
            <div className="flex items-center gap-5 pb-5 border-b border-gray-100 relative">
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white shrink-0"
                />
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-gray-800 m-0">
                        {studentInfo.user?.name} {studentInfo.user?.lastName}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-500 text-sm m-0">
                            {calculateAge(studentInfo.birthDate)}
                        </p>
                        {isBirthDate(studentInfo.birthDate) && (
                            <span
                                className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium animate-pulse">
                                🎉 День рождения!
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="border border-gray-200 rounded-xl divide-y divide-gray-100 mt-5 bg-white shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-3.5 text-sm">
                    <span className="font-medium text-gray-400 uppercase tracking-wider text-[11px]">Email</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-700">
                        <span>{studentInfo.user?.email}</span>
                        <span className="text-gray-300">›</span>
                    </div>
                </div>

                <div className="flex justify-between items-center p-3.5 text-sm">
                    <span className="font-medium text-gray-400 uppercase tracking-wider text-[11px]">Lesson Info</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-700">
                        <span>
                            {lessonDescriptor
                                ? `${lessonDescriptor.type} ${lessonDescriptor.title}`
                                : "None"}
                        </span>
                        <span className="text-gray-300">›</span>
                    </div>
                </div>

                <div className="flex justify-between items-center p-3.5 text-sm">
                    <span className="font-medium text-gray-400 uppercase tracking-wider text-[11px]">Mentor</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-700">
                        <span>
                            {studentInfo.mentor
                                ? `${studentInfo.mentor.user?.name} ${studentInfo.mentor.user?.lastName}`
                                : "None"}
                        </span>
                        <span className="text-gray-300">›</span>
                    </div>
                </div>
            </div>

            <div className="lessons-summary mt-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Расписание:</h4>
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                    <YearCalendar
                        year={2026}
                        lessons={lessonDescriptor?.lessonInfo?.flatMap(info => info.lessons) || []}
                        onLessonClick={handleLessonClick}
                    />
                </div>
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
        </div>
    );
};

export default StudentInfo;