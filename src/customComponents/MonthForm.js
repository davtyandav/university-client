import React, { useState, useCallback } from 'react';
import { generateMount } from '../services/api';
import '../styles/form.css';

const MonthSelect = ({ descriptorId, onClose }) => {
    const [formData, setFormData] = useState({
        lessonDescriptorId: descriptorId,
        monthType: ''
    });

    const [error, setError] = useState('');

    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.monthType) {
            setError("Выберите месяц");
            return;
        }

        try {
            await generateMount(formData);
            onClose();
        } catch (error) {
            setError("Ошибка сервера");
        }
    };

    return (
        <div className="modalWrapper">
            <div className="modalCard">

                {/* ❌ close */}
                <div className="closeBtn" onClick={onClose}>✕</div>

                {/* 🧾 title */}
                <h2 className="title">Генерация Mount</h2>

                <div className="divider"></div>

                <form onSubmit={handleSubmit}>

                    <div className="formGroup">
                        <label className="label">Выберите месяц</label>

                        <select
                            name="monthType"
                            value={formData.monthType}
                            onChange={handleChange}
                            className="select"
                        >
                            <option value="">Выберите месяц...</option>
                            {months.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>

                        {error && <span className="error">{error}</span>}
                    </div>

                    <div className="btnGroup">
                        <button type="submit" className="saveBtn">
                            Сгенерировать
                        </button>

                        <button type="button" onClick={onClose} className="cancelBtn">
                            Отмена
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default MonthSelect;