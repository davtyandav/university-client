import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import LessonForm from "./LessonForm";
import {getLessonDescriptor} from "../../services/api";
import MountSelect from "../../customComponents/MonthForm";
import StudentSelect from "../../customComponents/StudentSelect";
import LessonInfoModal from "./LessonInfoModal";

const LessonList = () => {
    const [lessonsDescriptor, setLessonsDescriptor] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLessonInfoModalOpen, setIsLessonInfoModalOpen] = useState(false);
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

    const [selectedDescriptorId, setSelectedDescriptorId] = useState(null);
    const [activeLessonParams, setActiveLessonParams] = useState(null);

    const [expandedMonths, setExpandedMonths] = useState({});

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

    const toggleMonth = (descriptorId, monthType) => {
        const key = `${descriptorId}-${monthType}`;
        setExpandedMonths(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleLessonClick = (descriptorId, lessonId) => {
        setActiveLessonParams({descriptorId, lessonId});
        setIsLessonInfoModalOpen(true);
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
                    <div key={descriptor.id} className="lesson-list">
                        <div className="descriptor" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                            <div className="mentorInfo" style={{whiteSpace: 'nowrap'}}>
                                <strong>Ментор:</strong> {descriptor.mentorResponse?.user
                                ? `${descriptor.mentorResponse.user.name} ${descriptor.mentorResponse.user.lastName || ''}`
                                : 'Не назначен'}
                            </div>

                            <span style={{color: '#ccc'}}>•</span>

                            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                <div className="badgeContainer" style={{display: 'flex', gap: '8px'}}>
                                    <span className="typeBadge">{descriptor.type}</span>
                                </div>

                                <h2 className="title" style={{margin: 0, fontSize: '1.2rem'}}>
                                    {descriptor.title}
                                </h2>
                            </div>

                            <span style={{color: '#ccc'}}>•</span>

                            <div className="badgeContainer">
                                <span className="dayBadge">{descriptor.dayType}</span>
                            </div>
                        </div>

                        <div className="mb-5 flex justify-between items-center w-full">
                            <button className="addButton" onClick={() => {
                                setIsStudentModalOpen(true);
                                setSelectedDescriptorId(descriptor.id);
                            }}>
                                Attach students in lesson
                            </button>
                            <div className="details">
                                <p><strong>Дата начала:</strong> {formatDate(descriptor.data)}</p>
                            </div>
                            <button className="addButton" onClick={() => {
                                setSelectedDescriptorId(descriptor.id);
                                setIsMonthModalOpen(true);
                            }}>
                                Generate lessons
                            </button>
                        </div>

                        <div className="subListSection">
                            {descriptor.lessonInfo?.map((info, index) => {
                                const isOpen = expandedMonths[`${descriptor.id}-${info.monthType}`];

                                return (
                                    <div key={index} className="mb-6">
                                        <h3
                                            className="monthHeader"
                                            onClick={() => toggleMonth(descriptor.id, info.monthType)}
                                            style={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                userSelect: 'none'
                                            }}
                                        >
                                            <span style={{fontSize: '0.8em'}}>{isOpen ? '▼' : '▶'}</span>
                                            {info.monthType}
                                        </h3>

                                        {isOpen && (
                                            <div className="lessonGrid">
                                                {info.lessons?.map((lesson) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="lessonItem"
                                                        onClick={() => handleLessonClick(descriptor.id, lesson.id)}
                                                    >
                                                        <div className="statusIcon">
                                                            {lesson.completed ? '✅' : '⏳'}
                                                        </div>
                                                        <span
                                                            className={lesson.completed ? 'completedText' : 'pendingText'}>
                                                            {formatDate(lesson.data)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <LessonForm onClose={() => setIsModalOpen(false)}/>
            </Modal>

            <Modal isOpen={isLessonInfoModalOpen} onClose={() => setIsLessonInfoModalOpen(false)}>
                {activeLessonParams && (
                    <LessonInfoModal
                        params={activeLessonParams}
                        onClose={() => setIsLessonInfoModalOpen(false)}
                    />
                )}
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
                    descriptorId={selectedDescriptorId}
                    onClose={() => setIsStudentModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default LessonList;