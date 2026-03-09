import React, {useEffect, useState} from 'react';
// Добавляем импорт модалки и, предположим, формы (создай ее по аналогии с MentorForm)
import Modal from "../Modal";
import LessonForm from "./LessonForm"; // Тебе нужно будет создать этот компонент
import {getLessonDescriptor, getStudentsByLessonDescriptor} from "../../services/api";

const LessonList = () => {
    const [lessonsDescriptor, setLessonsDescriptor] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- НОВЫЕ СОСТОЯНИЯ ДЛЯ МОДАЛКИ ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    // -----------------------------------

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
            .catch(error => {
                console.error("Ошибка при загрузке данных:", error);
                setLoading(false);
            });
    };

    const handleAddLesson = () => {
        setIsModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsModalOpen(false);
        fetchLessons(); // Обновляем список после закрытия (если добавили)
    };

    const fetchStudents = (lessonDescriptorId, lessonId) => {
        setLoading(true);
        getStudentsByLessonDescriptor(lessonDescriptorId, lessonId)
            .then(data => {
                console.log(data)
                setStudents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Ошибка при загрузке данных:", error);
                setLoading(false);
            });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (loading) {
        return <div style={{padding: '20px'}}>Загрузка данных...</div>;
    }

    function getCompleted(lesson) {
        return lesson.completed;
    }

    function infoLesson(lessonDescriptorId, lessonId) {
        fetchStudents(lessonDescriptorId, lessonId)
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.mainTitle}>Учебный план: Дескрипторы</h1>

            {/* НОВАЯ КНОПКА ДОБАВЛЕНИЯ */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={handleAddLesson} style={styles.addButton}>
                    Добавить дескриптор
                </button>
            </div>

            {lessonsDescriptor.length === 0 ? (
                <p>Список пуст.</p>
            ) : (
                lessonsDescriptor.map((descriptor) => (
                    <div key={descriptor.id} style={styles.card}>
                        <div style={styles.header}>
                            <div>
                                <h2 style={styles.title}>{descriptor.title}</h2>
                                <div style={styles.badgeContainer}>
                                    <span style={styles.typeBadge}>{descriptor.type}</span>
                                    <span style={styles.dayBadge}>{descriptor.dayType}</span>
                                </div>
                            </div>
                            <div style={styles.mentorInfo}>
                                <strong>Ментор:</strong> {descriptor.mentorResponse?.name || 'Не назначен'}
                            </div>
                        </div>

                        <div style={styles.details}>
                            <p><strong>Дата создания:</strong> {formatDate(descriptor.data)}</p>
                        </div>

                        <div style={styles.subListSection}>
                            <h4 style={styles.subTitle}>Занятия (Lessons):</h4>
                            {descriptor.lessons && descriptor.lessons.length > 0 ? (
                                <div style={styles.lessonGrid}>
                                    {descriptor.lessons.map((lesson) => (
                                        <div key={lesson.id} style={styles.lessonItem}
                                             onClick={() => infoLesson(descriptor.id, lesson.id)}>
                                            <div style={styles.statusIcon}>
                                                {getCompleted(lesson) ? '✅' : '⏳'}
                                            </div>
                                            <div style={styles.lessonData}>
                                                   <span
                                                       style={lesson.completed ? styles.completedText : styles.pendingText}>
                                                      {formatDate(lesson.data)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={styles.emptyText}>Уроки не запланированы</p>
                            )}
                        </div>
                    </div>
                ))
            )}

            {/* НОВАЯ МОДАЛКА */}
            <Modal isOpen={isModalOpen} onClose={handleCloseAddModal}>
                <LessonForm onClose={handleCloseAddModal} />
            </Modal>
        </div>
    );
}

// ДОБАВИЛ СТИЛЬ ДЛЯ КНОПКИ
const styles = {
    // ... твои старые стили без изменений ...
    container: {
        padding: '30px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: '#f4f7f6',
        minHeight: '100vh'
    },
    mainTitle: {
        textAlign: 'center',
        color: '#34495e',
        marginBottom: '30px'
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    card: {
        border: 'none',
        borderRadius: '12px',
        padding: '25px',
        marginBottom: '25px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
        backgroundColor: '#fff',
        maxWidth: '800px',
        margin: '0 auto 25px auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '15px',
        marginBottom: '15px'
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
        color: '#2c3e50'
    },
    badgeContainer: {
        marginTop: '8px',
        display: 'flex',
        gap: '10px'
    },
    typeBadge: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        textTransform: 'uppercase'
    },
    dayBadge: {
        backgroundColor: '#95a5a6',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem'
    },
    mentorInfo: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        textAlign: 'right'
    },
    details: {
        fontSize: '0.95rem',
        color: '#444',
        marginBottom: '20px'
    },
    subListSection: {
        backgroundColor: '#fdfdfd',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #f1f1f1'
    },
    subTitle: {
        margin: '0 0 10px 0',
        fontSize: '1rem',
        color: '#34495e'
    },
    lessonGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '12px'
    },
    lessonItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ebebeb',
        borderRadius: '6px',
        gap: '10px',
        cursor: 'pointer' // добавил курсор, так как есть onClick
    },
    statusIcon: {
        fontSize: '1.2rem'
    },
    lessonData: {
        display: 'flex',
        flexDirection: 'column'
    },
    lessonDate: {
        fontSize: '0.75rem',
        color: '#999'
    },
    completedText: {
        fontWeight: 'bold',
        color: '#27ae60'
    },
    pendingText: {
        fontWeight: 'bold',
        color: '#e67e22'
    },
    emptyText: {
        fontSize: '0.9rem',
        color: '#bdc3c7',
        fontStyle: 'italic'
    }
};

export default LessonList;