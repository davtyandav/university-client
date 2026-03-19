import React from 'react';
import avatar from '../../assets/user.png';
import DeleteButton from "../../customComponents/DeleteButton";

const MentorCard = ({ mentor, onEdit, onDelete, onClick }) => {
    return (
        <div className="card" onClick={() => onClick(mentor.id)}>
            <img src={avatar} alt="User Avatar" />
            <div>{mentor.name} {mentor.lastName}</div>
            <button className="btn edit-btn" onClick={(e) => {
                e.stopPropagation();
                onEdit(mentor.id);
            }}>Edit
            </button>
            <DeleteButton
                id={mentor.id}
                onDelete={onDelete}
            />
        </div>
    );
};

export default MentorCard;
