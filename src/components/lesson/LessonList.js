import React, { useEffect, useState } from 'react';
import Modal from "../Modal";
import LessonForm from "./LessonForm";
import { getLessonDescriptor, getStudentsByLessonDescriptor } from "../../services/api";
import MountSelect from "../../customComponents/MonthForm";
import StudentSelect from "../../customComponents/StudentSelect";
//  import './list.css'; // Tailwind + @apply    

const LessonList = () => {
    const [lessonsDescriptor, setLessonsDescriptor] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDescriptorId, setSelectedDescriptorId] = useState(null);
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);


    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = () => {
        setLoading(true);
        getLessonDescriptor()
            .then(data => {
                setLessonsDescriptor(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const fetchStudents = (lessonDescriptorId, lessonId) => {
        setLoading(true);
        getStudentsByLessonDescriptor(lessonDescriptorId, lessonId)
            .then(data => {
                setStudents(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU');
    };

    if (loading) return <div className="p-5">Загрузка данных...</div>;

    return (
        <div className="container">
            <h1 className="mainTitle">Учебный план: Дескрипторы</h1>

            <div className="text-center mb-5">
                <button onClick={() => setIsModalOpen(true)} className="addButton">
                    Добавить дескриптор
                </button>
            </div>

            {lessonsDescriptor.length === 0 ? (
                <p>Список пуст.</p>
            ) : (
                lessonsDescriptor.map((descriptor) => (
                    <div key={descriptor.id} className="card">

                        <div className="text-center mb-5">
                            <button
                                onClick={() => {
                                    setIsStudentModalOpen(true);
                                }}
                                className="addButton"
                            >
                                atache students
                            </button>
                        </div>

                        <div className="text-center mb-5">
                            <button
                                onClick={() => {
                                    setSelectedDescriptorId(descriptor.id);
                                    setIsMonthModalOpen(true);
                                }}
                                className="addButton"
                            >
                                generate lessons
                            </button>
                        </div>

                        <div className="header">
                            <div>
                                <h2 className="title">{descriptor.title}</h2>

                                <div className="badgeContainer">
                                    <span className="typeBadge">{descriptor.type}</span>
                                    <span className="dayBadge">{descriptor.dayType}</span>
                                </div>
                            </div>

                            <div className="mentorInfo">
                                <strong>Ментор:</strong> {descriptor.mentorResponse?.name || 'Не назначен'}
                            </div>
                        </div>

                        <div className="details">
                            <p><strong>Дата:</strong> {formatDate(descriptor.data)}</p>
                        </div>

                        <div className="subListSection">
                            {descriptor.lessonInfo?.map((info, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="monthHeader">{info.monthType}</h3>

                                    <div className="lessonGrid">
                                        {info.lessons?.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className="lessonItem"
                                                onClick={() => fetchStudents(descriptor.id, lesson.id)}
                                            >
                                                <div className="statusIcon">
                                                    {lesson.completed ? '✅' : '⏳'}
                                                </div>

                                                <span className={lesson.completed ? 'completedText' : 'pendingText'}>
                                                    {formatDate(lesson.data)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <LessonForm onClose={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isMonthModalOpen} onClose={() => setIsMonthModalOpen(false)}>
                {selectedDescriptorId && (
                    <MountSelect
                        descriptorId={selectedDescriptorId}
                        onClose={() => setIsMonthModalOpen(false)}
                    />
                )}
            </Modal>

            <Modal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)}>
                <StudentSelect
                    onClose={() => setIsStudentModalOpen(false)}
                />
            </Modal>

        </div>
    );
};

export default LessonList;