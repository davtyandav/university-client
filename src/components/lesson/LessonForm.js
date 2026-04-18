import React, { useEffect, useState, useCallback } from "react";
import { createLessonDescriptor, getMentors } from "../../services/api";
import "../../styles/lessonsForm.css";

const LessonForm = ({ onClose }) => {
    const [mentors, setMentors] = useState([]);
    const [lessons, setLessons] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        type: 'GROUP',
        lessonDayType: 'ODD_DAY',
        startDate: '',
        lessonTime: '',
        mentorId: ''
    });

    const lessonOptions = [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Java"
    ];

    useEffect(() => {
        getMentors()
            .then(data => setMentors(data))
            .catch(err => console.error("Ошибка загрузки менторов", err));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleCheckboxChange = (value) => {
        setLessons(prev => {
            if (prev.includes(value)) {
                return prev.filter(item => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleAddLessonsToTitle = () => {
        if (lessons.length === 0) return;

        setFormData(prev => ({
            ...prev,
            title: prev.title
                ? `${prev.title}, ${lessons.join(", ")}`
                : lessons.join(", ")
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="lesson-form-container relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="lesson-form-title">
                    Добавить учебный план
                </h2>

                <form onSubmit={handleSubmit} className="lesson-form">

                    <label>Название занятия</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <div className="flex flex-col gap-2">
                        {lessonOptions.map((item) => (
                            <label
                                key={item}
                                className="flex items-center gap-2 text-gray-700"
                            >
                                <input
                                    type="checkbox"
                                    checked={lessons.includes(item)}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                                {item}
                            </label>
                        ))}
                    </div>

                    <label>Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="GROUP">GROUP</option>
                        <option value="SINGLE">SINGLE</option>
                    </select>

                    <label>Day Type</label>
                    <select
                        name="lessonDayType"
                        value={formData.lessonDayType}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="ODD_DAY">ODD_DAY</option>
                        <option value="EVEN_DAY">EVEN_DAY</option>
                    </select>

                    <label>Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <label>Time</label>
                    <input
                        type="time"
                        name="lessonTime"
                        value={formData.lessonTime}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />


                    {/* ✅ OK BUTTON */}
                    <button
                        type="button"
                        onClick={handleAddLessonsToTitle}
                        className="mt-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                    >
                        OK
                    </button>

                    <label>Mentor</label>
                    <select
                        name="mentorId"
                        value={formData.mentorId}
                        onChange={handleChange}
                        className="input-field"
                        required
                    >
                        <option value="">Select mentor</option>
                        {mentors.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.user.name} {m.user.lastName}
                            </option>
                        ))}
                    </select>

                    <div className="btnGroup">
                        <button type="submit" className="saveBtn">
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="cancelBtn"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LessonForm;
