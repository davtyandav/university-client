import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import MentorCard from "./MentorCard";
import {deleteMentor, getMentorById, getUsersByRole} from '../../services/api';
import '../../styles/app.css';
import MentorInfo from "./MentorInfo";
import AttacheStudentsModal from "../../customComponents/AttacheStudentsModal";

const MentorList = () => {
    const [users, setUsers] = useState([]);
    const [mentorInfo, setMentorInfo] = useState(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

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
            <div className="p-5 m-5 bg-white">
                <button className="addButton" onClick={() => setIsStudentModalOpen(true)}>Attache students</button>
            </div>
            <div className="p-2 m-5 bg-white">

                <div className="list">
                    {users.map((user) => (
                        <MentorCard
                            key={user.id}
                            user={user}
                            onDelete={handleDelete}
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

            <Modal isOpen={isStudentModalOpen} width="500px" onClose={() => setIsStudentModalOpen(false)}>
                <AttacheStudentsModal
                    mentorId={null}
                    onClose={() => setIsStudentModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default MentorList;
