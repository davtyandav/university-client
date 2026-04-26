import React from 'react';
import avatar from '../../assets/user.png';
import {calculateAge} from '../../services/utils';
import LessonDescriptor from "../pages/LessonDescriptor";

const MentorInfo = ({mentorInfo}) => {
    if (!mentorInfo) return null;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full border-2 border-white"/>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {mentorInfo.user.name} {mentorInfo.user.lastName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {calculateAge(mentorInfo.birthDate)} years old
                    </p>
                </div>
            </div>

            {mentorInfo.lessonDescriptors?.length > 0 ? (
                mentorInfo.lessonDescriptors.map((descriptor) => (
                    <LessonDescriptor descriptor={descriptor}/>
                ))
            ) : (
                <div className="p-10 text-center text-gray-400 border-2 border-dashed rounded-2xl">
                    No active lesson descriptors
                </div>
            )}
        </div>
    );
};

export default MentorInfo;