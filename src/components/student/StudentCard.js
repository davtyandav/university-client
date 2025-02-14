import React from 'react';
import avatar from '../../assets/user.png';

const StudentCard = ({student, onEdit, onDelete, onClick}) => {
    return (
        <div className="student-card" onClick={() => onClick(student.id)}>
            <img src={avatar} alt="User Avatar"/>
            <div>{student.name} {student.lastName}</div>
            <button className="btn edit-btn" onClick={(e) => {
                e.stopPropagation();
                onEdit(student.id);
            }}>Edit
            </button>
            <button className="btn delete-btn" onClick={(e) => {
                e.stopPropagation();
                onDelete(student.id);
            }}>Delete
            </button>
        </div>
    );
};

export default StudentCard;
