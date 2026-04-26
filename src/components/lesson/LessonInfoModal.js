import React, {useEffect, useState} from "react";
import {getStudentsByLessonDescriptor} from "../../services/api";
import "../../styles/lessonsForm.css";

const LessonInfoModal = ({onClose, params}) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params) {
            fetchStudents(params.descriptorId, params.lessonId);
        }
    }, [params]);

    const fetchStudents = (descriptorId, lessonId) => {
        console.log(descriptorId, lessonId)
        setLoading(true);
        getStudentsByLessonDescriptor(descriptorId, lessonId)
            .then(data => {
                console.log(data)
                if (data && data.students) {
                    setStudents(data.students);
                } else if (Array.isArray(data)) {
                    setStudents(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Студенты на занятии</h2>

            {loading ? (
                <p>Загрузка списка студентов...</p>
            ) : students.length > 0 ? (
                <ul className="student-list">
                    {students.map(student => (
                        <li key={student.id} className="border-b py-2">
                            {student.name} {student.surname}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>На этот урок студенты не назначены.</p>
            )}

            <button
                onClick={onClose}
                className="addButton mt-4"
                style={{width: '100%'}}
            >
                Закрыть
            </button>
        </div>
    );
};

export default LessonInfoModal;