import React from 'react';
import Card from '../../customComponents/Card';

const MentorCard = ({ mentor, onEdit, onDelete, onClick }) => {
    return (
        <Card student={mentor} onEdit={onEdit} onDelete={onDelete} onClick={onClick} />
    );
};

export default MentorCard;
