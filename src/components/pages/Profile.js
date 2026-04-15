import React, {useEffect, useState} from 'react';
import {getMe} from '../../services/api';
import avatarPlaceholder from '../../assets/user.png';
import StudentProfile from './StudentProfile';
import MentorProfile from './MentorProfile';
import AdminProfile from './AdminProfile';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMe()
            .then(data => {
                console.log(data)
                setProfileData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-10 text-center">Загрузка...</div>;
    if (!profileData) return <div className="p-10 text-center">Войдите в систему</div>;

    const {role, name, lastName, email, id} = profileData;

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-6 mb-8 border-b pb-6">
                    <img src={avatarPlaceholder} className="w-24 h-24 rounded-full border shadow-sm" alt="avatar"/>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{name} {lastName}</h1>
                        <span
                            className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                            {role.replace('ROLE_', '')}
                        </span>
                        <p className="text-gray-500 mt-1">{email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {role.includes('STUDENT') && <StudentProfile userId={id}/>}
                    {role.includes('MENTOR') && <MentorProfile userId={id}/>}
                    {role.includes('ADMIN') && <AdminProfile/>}
                </div>

            </div>
        </div>
    );
};

export default Profile;