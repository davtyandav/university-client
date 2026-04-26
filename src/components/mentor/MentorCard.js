import React from 'react';
import Card from '../../customComponents/Card';

const MentorCard = ({user, onDelete, onClick}) => {

    return (
        <>
            <Card user={user} onClick={onClick}/>

        </>
    );
};

export default MentorCard;
