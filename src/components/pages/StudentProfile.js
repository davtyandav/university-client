import React, { useEffect, useState } from 'react';
import {getStudentById} from '../../services/api';
import { calculateAge } from '../../services/utils';
import YearCalendar from "../caledar/YearCalendar";

const StudentProfile = ({ userId }) => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            getStudentById(userId)
                .then(data => {
                    setStudentData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Ошибка загрузки данных студента:", err);
                    setLoading(false);
                });
        }
    }, [userId]);

    if (loading) return <div className="p-4 text-center text-gray-500">Загрузка данных...</div>;
    if (!studentData) return <div className="p-4 text-center text-red-500">Данные студента не найдены</div>;

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-400 text-sm mb-2 font-medium uppercase">Дата рождения</h3>
                <p className="font-semibold text-gray-700">
                    {studentData.birthDate ? studentData.birthDate.split('T')[0] : "Не указана"}
                    {studentData.birthDate && (
                        <span className="ml-2 text-blue-500 font-normal">
                            ({calculateAge(studentData.birthDate)} лет)
                        </span>
                    )}
                </p>
            </div>

            <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-400 text-sm mb-2 font-medium uppercase">Курс / Предмет</h3>
                <p className="font-semibold text-gray-700">
                    {studentData.lessonDescriptor ? (
                        <span className="text-indigo-600">
                            {studentData.lessonDescriptor.type}: {studentData.lessonDescriptor.title}
                        </span>
                    ) : (
                        <span className="text-gray-400">Не назначен</span>
                    )}
                </p>
            </div>

            <div className="col-span-1 md:col-span-2 info-card bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-blue-400 text-sm mb-3 font-medium uppercase">Ваш наставник (Mentor)</h3>
                {studentData.mentor ? (
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold shadow-sm">
                            {studentData.mentor.user?.name?.[0]}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">
                                {studentData.mentor.user?.name} {studentData.mentor.user?.lastName}
                            </p>
                            <p className="text-sm text-blue-600">{studentData.mentor.user?.email}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 italic">Наставник пока не назначен</p>
                )}
            </div>

            {studentData.lessonDescriptor && studentData.lessonDescriptor.lessonInfo && (
                <div className="lessons-summary">
                    <h4>Расписание:</h4>
                    <YearCalendar
                        year={2026}
                        lessons={studentData.lessonDescriptor.lessonInfo.flatMap(info => info.lessons)}
                    />
                </div>
            )}


        </div>
    );
};

export default StudentProfile;