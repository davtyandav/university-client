import React, {useEffect, useState} from 'react';
import {getMentorById, getMentorByUserId} from '../../services/api';
import {calculateAge} from '../../services/utils';

const MentorProfile = ({userId}) => {
    const [mentorData, setMentorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            getMentorById(userId)
                .then(data => {
                    setMentorData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Ошибка загрузки данных ментора:", err);
                    setError("Не удалось загрузить данные ментора");
                    setLoading(false);
                });
        }
    }, [userId]);

    if (loading) return <div className="p-5 text-center text-gray-500">Загрузка данных ментора...</div>;
    if (error) return <div className="p-5 text-center text-red-500">{error}</div>;
    if (!mentorData) return null;

    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Дата рождения */}
                <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-gray-400 text-sm mb-2 font-medium">Дата рождения</h3>
                    <p className="font-semibold text-gray-700">
                        {mentorData.birthDate ? mentorData.birthDate.split('T')[0] : "Не указана"}
                        {mentorData.birthDate && ` (${calculateAge(mentorData.birthDate)} лет)`}
                    </p>
                </div>

                {/* Количество дескрипторов уроков */}
                <div className="info-card bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-gray-400 text-sm mb-2 font-medium">Активных курсов</h3>
                    <p className="font-semibold text-gray-700 text-xl">
                        {mentorData.lessonDescriptors?.length || 0}
                    </p>
                    <samp>
                        {mentorData.lessonDescriptors && mentorData.lessonDescriptors.length > 0
                            ? `${mentorData.lessonDescriptors[0].type} ${mentorData.lessonDescriptors[0].title}`
                            : "None"}
                    </samp>
                </div>
            </div>

            {/* Список студентов */}
            {mentorData.students?.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                        Мои студенты ({mentorData.students.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mentorData.students.map(student => (
                            <div key={student.id}
                                 className="p-4 bg-white border border-gray-200 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                    {student.user?.name?.[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">
                                        {student.user?.name} {student.user?.lastName}
                                    </p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Студент</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorProfile;