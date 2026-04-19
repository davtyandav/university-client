import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import avatar from '../../assets/user.png';
import MentorCard from "./MentorCard";
import MentorForm from "./MentorForm";
import {deleteMentor, getMentorById, getMentors} from '../../services/api';
import '../../styles/app.css';
import {isBirthDate, calculateAge} from '../../services/utils';
import YearCalendar from "../caledar/YearCalendar";

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMentor, setEditingMentor] = useState(null);
    const [mentorInfo, setMentorInfo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleAddMentor = () => {
        setIsModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsModalOpen(false);
        fetchMentors();
    };

    const openMentorInfo = (id) => {
        getMentorById(id)
            .then(currentMentor => {
                console.log("currentMentor", currentMentor)
                setMentorInfo(currentMentor)
                setIsInfoModalOpen(true);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const fetchMentors = () => {
        getMentors()
            .then(data => {
                console.log(data)
                setMentors(data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleDelete = (id) => {
        deleteMentor(id)
            .then(() => {
                console.log("Deleted mentor id = " + id);
                fetchMentors();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="panel">
            <div className="p-5 m-5 bg-white">Mentors</div>
            <div className="p-2 m-5 bg-white">
                <button className="btn btn-primary p-2 bg-blue-900 text-white " onClick={handleAddMentor}>
                    Add Mentor
                </button>

                <div className="list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {mentors.map((mentor) => (
                        <MentorCard
                            key={mentor.id}
                            mentor={mentor}
                            // onEdit={updateMentor}
                            onDelete={handleDelete}
                            onClick={openMentorInfo}
                        />
                    ))}
                </div>
            </div>

            {/*<Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>*/}
            {/*    <MentorForm mentor={editingMentor} onClose={handleCloseModal}/>*/}
            {/*</Modal>*/}

            <Modal isOpen={isModalOpen} onClose={handleCloseAddModal}>
                <MentorForm mentor={null} onClose={handleCloseAddModal}/>
            </Modal>

            {mentorInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} width="600px">
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

                        {mentorInfo.lessonDescriptors && mentorInfo.lessonDescriptors.length > 0 ? (
                            mentorInfo.lessonDescriptors.map((descriptor) => (
                                <div key={descriptor.id}
                                     className="border rounded-2xl overflow-hidden bg-white shadow-sm">

                                    <div className="bg-blue-900 p-3 flex justify-between items-center">
                                        <h3 className="text-white font-bold uppercase tracking-wide text-sm">
                                            {descriptor.type}: {descriptor.title}
                                        </h3>
                                        <span className="text-blue-200 text-xs">ID: {descriptor.id}</span>
                                    </div>

                                    <div className="p-4 flex flex-col gap-3">
                            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                                Students on this course:
                            </span>
                                        {descriptor.studentResponses && descriptor.studentResponses.length > 0 ? (
                                            descriptor.studentResponses.map((student) => (
                                                <div
                                                    key={student.id}
                                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                                                            {student.user.name[0]}
                                                        </div>
                                                        <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {student.user.name} {student.user.lastName}
                                                </span>
                                                            <span className="text-[10px] text-gray-400">
                                                    {student.user.email}
                                                </span>
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-300 text-lg">›</span>

                                                </div>

                                            ))
                                        ) : (
                                            <div className="py-4 text-center text-gray-400 text-xs italic">
                                                No students assigned to this descriptor
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400 border-2 border-dashed rounded-2xl">
                                No active lesson descriptors for this mentor
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MentorList;
