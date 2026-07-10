import React, { useEffect, useState } from 'react';
import Modal from "../Modal";
import MentorCard from "./MentorCard";
import SearchInput from '../../customComponents/SearchInput';
import { getMentorById, getUsersByRole } from '../../services/api';
import MentorInfo from "./MentorInfo";
import '../../styles/app.css';

const MentorList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mentorInfo, setMentorInfo] = useState(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    useEffect(() => {
        fetchMentors();
    }, []);

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
        getUsersByRole("MENTOR")
            .then(data => {
                console.log("mentors", data)
                setUsers(data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        return (
            user.name?.toLowerCase().includes(search) ||
            user.lastName?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="w-full">
            <div className="mx-5 mt-5">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search mentors by name, last name, or email..."
                />
            </div>

            <div className="p-2 m-5 bg-white shadow-sm rounded">
                <div className="list">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <MentorCard
                                key={user.id}
                                user={user}
                                onClick={openMentorInfo}
                            />
                        ))
                    ) : (
                        <div className="p-3 text-center text-gray-500">
                            No mentors found
                        </div>
                    )}
                </div>
            </div>

            {mentorInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} width="600px">
                    <MentorInfo mentorInfo={mentorInfo}/>
                </Modal>
            )}
        </div>
    );
};

export default MentorList;