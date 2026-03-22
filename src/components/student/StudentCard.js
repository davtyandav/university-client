import React from 'react';
import Card from '../../customComponents/Card';

const StudentCard = ({ student, onEdit, onDelete, onClick }) => {
    return (
        <Card student={student} onEdit={onEdit} onDelete={onDelete} onClick={onClick} />
    );
};

export default StudentCard;