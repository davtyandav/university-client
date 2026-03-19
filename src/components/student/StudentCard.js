import React from 'react';
import avatar from '../../assets/user.png';
import DeleteButton from "../../customComponents/DeleteButton";

const StudentCard = ({ student, onEdit, onDelete, onClick }) => {
    return (
        <div className="card" onClick={() => onClick(student.id)}>
            <img src={avatar} alt="User Avatar" />
            <div>{student.name} {student.lastName}</div>
            <button className="btn edit-btn" onClick={(e) => {
                e.stopPropagation();
                onEdit(student.id);
            }}>Edit
            </button>
            <DeleteButton
                id={student.id}
                onDelete={onDelete}
            />
        </div>
    );
};

export default StudentCard;
