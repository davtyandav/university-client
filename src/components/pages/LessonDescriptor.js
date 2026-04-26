import React from 'react'
import YearCalendar from '../caledar/YearCalendar'
import { useState } from 'react';
import "./lessonDescriptor.css"
export default function LessonDescriptor({ descriptor }) {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div key={descriptor.id}
            className="lesson-descriptor">

            <div
                className="lesson-descriptor-header "
                onClick={() => setIsOpen(!isOpen)}
            >
                <span >{descriptor.dayType}</span>

                <span className="span">
                    {descriptor.type}: {descriptor.title}
                </span>
                <h1 >{isOpen ? "↓" : "→"}</h1>

            </div>

            {/* Список студентов этого конкретного дескриптора */}
            {isOpen &&
                <div className="descriptor-container">
                    <p >Список студентов:</p>
                    <div className="descriptor-container-students">
                        {descriptor.studentResponses && descriptor.studentResponses.length > 0 ? (
                            descriptor.studentResponses.map((student) => (
                                <div key={student.id}
                                    className="descriptor-container-student">

                                    <div
                                        className="avatar">

                                        {student.user?.name?.[0]}

                                    </div>
                                    <div className=" student-info ">
                                        <span className="student-name">
                                            {student.user?.name} {student.user?.lastName}
                                        </span>
                                        <span className=" student-email ">
                                            {student.user?.email}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className=" empty">На этот курс студенты не
                                назначены</p>
                        )}
                    </div>
                    <div className="lessons-summary ">
                        <h4 className="font-semibold ">Расписание:</h4>
                        <YearCalendar
                            year={2026}
                            lessons={descriptor?.lessonInfo?.flatMap(info => info.lessons) || []}
                        />
                    </div>

                </div>
            }

            
        </div>
    )

}
