import React, { useState } from 'react';
import YearCalendar from '../caledar/YearCalendar';
import Modal from '../Modal';
import LessonInfoModal from './../lesson/LessonInfoModal';
import "../../styles/lessonDescriptor.css";

export default function LessonDescriptor({ descriptor }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const handleLessonClick = (lesson) => {
        console.log("Selected Lesson:", lesson);
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    return (
        <div className="lesson-descriptor" style={{ marginBottom: '20px' }}>
            <div
                className="lesson-descriptor-header"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer' }}
            >
                <span>{descriptor.dayType}</span>
                <span className="span">
                    {descriptor.type}: {descriptor.title}
                </span>
                <h1>{isOpen ? "↓" : "→"}</h1>
            </div>

            {isOpen && (
                <div className="descriptor-container">
                    <p><b>Список студентов курса:</b></p>
                    <div className="descriptor-container-students">
                        {descriptor.studentResponses && descriptor.studentResponses.length > 0 ? (
                            descriptor.studentResponses.map((student) => (
                                <div key={student.id} className="descriptor-container-student">
                                    <div className="avatar">
                                        {student.user?.name?.[0]}
                                    </div>
                                    <div className="student-info">
                                        <span className="student-name">
                                            {student.user?.name} {student.user?.lastName}
                                        </span>
                                        <span className="student-email">
                                            {student.user?.email}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty">На этот курс студенты не назначены</p>
                        )}
                    </div>

                    <div className="lessons-summary" style={{ marginTop: '20px' }}>
                        <h4 className="font-semibold">Расписание:</h4>
                        <YearCalendar
                            year={2026}
                            lessons={descriptor?.lessonInfo?.flatMap(info => info.lessons) || []}
                            onLessonClick={handleLessonClick}
                        />
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="800px"
            >
                {selectedLesson && (
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
                                descriptorId: descriptor.id,
                                lessonId: selectedLesson.id
                            }}
                            initialLessonData={selectedLesson}
                            onLessonUpdated={(updatedLesson) => {
                                setSelectedLesson(updatedLesson);
                                // Обновляем ссылку на объект прямо внутри структуры descriptor, чтобы календарь мгновенно обновился
                                const foundLesson = descriptor?.lessonInfo?.flatMap(info => info.lessons)
                                    .find(l => l.id === updatedLesson.id);
                                if (foundLesson) {
                                    Object.assign(foundLesson, updatedLesson);
                                }
                            }}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}