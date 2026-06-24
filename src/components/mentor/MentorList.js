import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import MentorCard from "./MentorCard";
import {getMentorById, getUsersByRole} from '../../services/api';
import MentorInfo from "./MentorInfo";
import '../../styles/app.css';

const MentorList = () => {
    const [users, setUsers] = useState([]);
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

    return (
        <div className="w-full">
            <div className="p-2 m-5 bg-white">

                <div className="list">
                    {users.map((user) => (
                        <MentorCard
                            key={user.id}
                            user={user}
                            onClick={openMentorInfo}
                        />
                    ))}
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
