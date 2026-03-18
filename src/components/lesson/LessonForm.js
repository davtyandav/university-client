import React, { useEffect, useState, useCallback } from 'react';
import { createLessonDescriptor, getMentors } from '../../services/api';

const LessonForm = ({ onClose }) => {
    const [mentors, setMentors] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        type: 'GROUP',
        lessonDayType: 'ODD_DAY',
        startDate: '',
        mentorId: ''
    });

    useEffect(() => {
        getMentors()
            .then(data => setMentors(data))
            .catch(err => console.error("Ошибка загрузки менторов", err));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.startDate || !formData.mentorId) {
            alert("Заполните все поля");
            return;
        }

        const requestData = {
            title: formData.title,
            type: formData.type.toUpperCase(),
            lessonDayType: formData.lessonDayType.toUpperCase(),
            startDate: `${formData.startDate}T00:00:00`,
            mentorId: Number(formData.mentorId)
        };
        console.log(requestData)
        try {
            await createLessonDescriptor(requestData);
            onClose();
        } catch (error) {
            console.error("Детали ошибки 400:", error.response?.data);
            const serverMessage = error.response?.data?.message || "Ошибка валидации данных";
            alert("Сервер не принял данные: " + serverMessage);
        }
    };

    return (
        <div className="form">
            <h2>Добавить учебный план</h2>
            <form onSubmit={handleSubmit}>
                <label>Название занятия</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Например: Основы Java"
                    required
                />
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="GROUP">GROUP</option>
                    <option value="SINGLE">SINGLE</option>
                </select>

                <label>DayType</label>
                <select name="lessonDayType" value={formData.lessonDayType} onChange={handleChange}>
                    <option value="ODD_DAY">ODD_DAY</option>
                    <option value="EVEN_DAY">EVEN_DAY</option>
                </select>

                <label>Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />

                <label>Назначить ментора</label>
                <select
                    name="mentorId"
                    value={formData.mentorId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите ментора...</option>
                    {mentors.map(mentor => (
                        <option key={mentor.id} value={mentor.id}>
                            {mentor.name} {mentor.lastName}
                        </option>
                    ))}
                </select>

                <div className="section-btn" style={{ marginTop: '20px' }}>
                    <button type="submit" style={btnStyles.save}>Сохранить</button>
                    <button type="button" onClick={onClose} style={btnStyles.cancel}>Отмена</button>
                </div>
            </form>
        </div>
    );
};

const btnStyles = {
    save: {
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px'
    },
    cancel: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default LessonForm;