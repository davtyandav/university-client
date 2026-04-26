import React, {useCallback, useEffect, useState} from 'react';
import {getMentors, getStudents, assignMentorToStudents} from '../services/api';
import '../styles/app.css';

const AttacheStudentsModal = ({onClose}) => {
    const [formData, setFormData] = useState({
        mentorId: '',
    });

    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mentorData, studentData] = await Promise.all([
                    getMentors(),
                    getStudents()
                ]);
                setMentors(mentorData);
                setStudents(studentData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id)
                ? prev.filter(studentId => studentId !== id)
                : [...prev, id]
        );
    };

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация
        if (!formData.mentorId) {
            alert("Пожалуйста, выберите ментора");
            return;
        }
        if (selectedStudents.length === 0) {
            alert("Выберите хотя бы одного студента");
            return;
        }

        try {
            const requestData = {
                mentorId: formData.mentorId,
                studentsIds: selectedStudents
            };
            await assignMentorToStudents(requestData);
            alert("Студенты успешно назначены!");
            onClose();
        } catch (error) {
            console.error('Ошибка при назначении ментора:', error);
            alert('Не удалось сохранить изменения');
        }
    };

    return (
        <div className="studentSelect p-4">
            <h2 className="title font-bold text-xl mb-6">Назначение ментора</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* ВЫБОР МЕНТОРА */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">1. Выберите ментора:</label>
                    <select
                        name="mentorId"
                        value={formData.mentorId}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                        <option value="">-- Список менторов --</option>
                        {mentors.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.user?.name} {m.user?.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ВЫБОР СТУДЕНТОВ */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">2. Выберите студентов:</label>
                    <div className="studentList max-h-[300px] overflow-y-auto border rounded-xl p-2 bg-white">
                        {students.length > 0 ? (
                            students.map(student => (
                                <label key={student.id}
                                       className="studentItem flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer border-b last:border-0 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-blue-600"
                                        checked={selectedStudents.includes(student.id)}
                                        onChange={() => handleCheckboxChange(student.id)}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800">
                                            {student.user.name} {student.user.lastName}
                                        </span>
                                        {student.mentor && (
                                            <span
                                                className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter">
                                                Текущий ментор: {student.mentor.user?.name}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            ))
                        ) : (
                            <p className="text-center py-4 text-gray-400">Загрузка студентов...</p>
                        )}
                    </div>
                </div>

                {/* КНОПКИ */}
                <div className="btnGroup flex gap-4 mt-2">
                    <button type="submit"
                            className="saveBtn flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
                        Прикрепить
                    </button>
                    <button type="button" onClick={onClose}
                            className="cancelBtn flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttacheStudentsModal;