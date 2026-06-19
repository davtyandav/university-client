import React from "react";
import {getMonthDays} from "../../services/utils";

const MonthCalendar = ({month, year, lessons, onLessonClick}) => {
    const days = getMonthDays(month, year);
    const today = new Date();

    const getStatusClass = (lesson) => {
        if (!lesson) return "";
        return lesson.completed ? "completed" : "not-completed";
    };

    const isToday = (day) => {
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    return (
        <div className="month-calendar">
            <table>
                <thead>
                <tr>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                </tr>
                </thead>
                <tbody>
                {days.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => {
                            // Оптимально ищем урок один раз для текущего дня
                            const currentLesson = day
                                ? lessons.find(lesson => {
                                    const lessonDate = new Date(lesson.data);
                                    return lessonDate.getDate() === day &&
                                        lessonDate.getMonth() === month &&
                                        lessonDate.getFullYear() === year;
                                })
                                : null;

                            const statusClass = getStatusClass(currentLesson);

                            return (
                                <td
                                    key={dayIndex}
                                    className={`${day ? statusClass : "empty"} 
                                                    ${dayIndex === 5 || dayIndex === 6 ? "weekend" : ""} 
                                                    ${isToday(day) ? "today" : ""}`}

                                    // Клик срабатывает только если это день с уроком
                                    onClick={() => day && currentLesson && onLessonClick(currentLesson)}

                                    // Если есть урок, делаем ячейку интерактивной на вид
                                    style={{cursor: (day && currentLesson) ? 'pointer' : 'default'}}
                                >
                                    {day && (
                                        <div className="cell-content">
                                                <span className="status-icon">
                                                    {statusClass === "completed" ? "✔" : statusClass === "not-completed" ? "_" : ""}
                                                </span>
                                            <span>{day}</span>
                                        </div>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthCalendar;