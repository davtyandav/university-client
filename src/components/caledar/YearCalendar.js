import React, { useState, useEffect } from "react";
import MonthCalendar from "./MonthCalendar";
import "../../styles/calendar.css";

// Принимаем проп onLessonClick и передаем его глубже
const YearCalendar = ({ year, lessons, onLessonClick }) => {
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

    useEffect(() => {
        // Оставляем исходную логику
    }, [year]);

    return (
        <div className="year-calendar">
            <select onChange={handleMonthChange} value={selectedMonth}>
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {month}
                    </option>
                ))}
            </select>
            {/* Передаем функцию в компонент месяца */}
            <MonthCalendar
                month={selectedMonth}
                year={year}
                lessons={lessons}
                onLessonClick={onLessonClick}
            />
        </div>
    );
};

export default YearCalendar;