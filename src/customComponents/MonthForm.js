import React, { useState, useCallback } from 'react';
import { generateMount } from '../services/api';

const MountForm = ({ descriptorId, onClose }) => {
    const [formData, setFormData] = useState({
        lessonDescriptorId: descriptorId,
        monthType: ''
    });

    const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ];


    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.lessonDescriptorId || !formData.monthType) {
            alert("Выберите занятие и месяц");
            return;
        }

        try {
            console.log(formData)
             await generateMount(formData);
            alert("Mount успешно сгенерирован");
            onClose();
        } catch (error) {
            console.error("Ошибка генерации mount:", error.response?.data);
            const serverMessage = error.response?.data?.message || "Ошибка сервера";
            alert("Сервер не принял данные: " + serverMessage);
        }
    };

    return (
        <div className="form">
            <h2>Генерация Mount</h2>
            <form onSubmit={handleSubmit}>

                <label>Выберите месяц</label>
                <select
                    name="monthType"
                    value={formData.monthType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите месяц...</option>
                    {months.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <div className="section-btn" style={{ marginTop: '20px' }}>
                    <button type="submit" style={btnStyles.save}>Сгенерировать</button>
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

export default MountForm;