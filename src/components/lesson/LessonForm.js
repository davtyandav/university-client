import React, {useEffect, useState, useCallback} from 'react';
import {createLessonDescriptor, getMentors} from '../../services/api';
import '../../styles/app.css';

const LessonForm = ({onClose}) => {
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
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!formData.title || !formData.startDate || !formData.mentorId) {
        //     alert("Заполните все поля");
        //     return;
        // }

        const requestData = {
            title: formData.title,
            type: formData.type.toUpperCase(),
            lessonDayType: formData.lessonDayType.toUpperCase(),
            startDate: `${formData.startDate}T00:00:00`,
            mentorId: Number(formData.mentorId)
        };

        try {
            await createLessonDescriptor(requestData);
            onClose();
        } catch (error) {
            console.error(error);
            const serverMessage = error.response?.data?.message || "Ошибка валидации данных";
            alert("Сервер не принял данные: " + serverMessage);
        }
    };

    return (
        <div className="lesson-form-container">
            <h2 className="lesson-form-title">Добавить учебный план</h2>
            <form onSubmit={handleSubmit} className="lesson-form">
                <label>Название занятия</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Например: Основы Java"
                    required
                    className="input-field"
                />

                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="input-field">
                    <option value="GROUP">GROUP</option>
                    <option value="SINGLE">SINGLE</option>
                </select>

                <label>DayType</label>
                <select name="lessonDayType" value={formData.lessonDayType} onChange={handleChange}
                        className="input-field">
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
                    className="input-field"
                />

                <label>Назначить ментора</label>
                <select name="mentorId" value={formData.mentorId} onChange={handleChange} required
                        className="input-field">
                    <option value="">Выберите ментора...</option>
                    {mentors.map(m => (
                        <option key={m.id} value={m.id}>
                            {m.user.name} {m.user.lastName}
                        </option>
                    ))}
                </select>

                <div className="btnGroup">
                    <button type="submit" className="saveBtn">
                        Сохранить
                    </button>

                    <button type="button" onClick={onClose} className="cancelBtn">
                        Отмена
                    </button>
                </div>

            </form>
        </div>
    );
};

export default LessonForm;
