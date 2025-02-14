import React from "react";
import {getMonthDays} from "../../services/utils";

const MonthCalendar = ({month, year, lessons}) => {
    const days = getMonthDays(month, year);
    const today = new Date();

    const getLessonStatus = (day) => {
        if (!day) return "";

        const lesson = lessons.find(lesson => {
            const lessonDate = new Date(lesson.data);
            return lessonDate.getDate() === day && lessonDate.getMonth() === month && lessonDate.getFullYear() === year;
        });
        if (lesson) {
            console.log(lesson);
            return lesson.completed ? "completed" : "not-completed";
        }
        return "";
    };

    const isToday = (day) => {
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    return (
        <div className="month-calendar">
            <h3>{new Date(year, month).toLocaleString("en-US", {month: "long"})}</h3>
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
                        {week.map((day, dayIndex) => (
                            <td
                                key={dayIndex}
                                className={`${day ? getLessonStatus(day) : "empty"} 
                                            ${dayIndex === 5 || dayIndex === 6 ? "weekend" : ""} 
                                            ${isToday(day) ? "today" : ""}`}
                            >
                                {day && (
                                    <div className="cell-content">
                                        <span className="status-icon">
                                               {getLessonStatus(day) === "completed" ? "✔" : getLessonStatus(day) === "not-completed" ? "_" : ""}
                                        </span>
                                        <span>{day}</span>
                                    </div>
                                )}
                            </td>

                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthCalendar;
