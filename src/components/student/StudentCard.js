import React from 'react';
import Card from '../../customComponents/Card';

const StudentCard = ({user, onClick}) => {
    return (
        <Card user={user} onClick={onClick}/>
    );
};

export default StudentCard;