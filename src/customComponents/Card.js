import React from 'react'
import avatar from '../assets/user.png';
import DeleteButton from "../customComponents/DeleteButton";
import "../styles/card.css"

export default function Card({student, onEdit, onDelete, onClick}) {
    return (
        <div
            className="card"
            onClick={() => onClick(student.user.id)}
        >
            <div className="card-avatar">
                <img src={avatar} alt="User Avatar"/>
            </div>

            <div className="card-info">
                <h3 className="card-name">
                    {student.user.name} {student.user.lastName}
                </h3>

                {/* <p className="student-id">
                    Student ID: #{student.id}
                </p> */}

                <div className="card-actions">
                    {/*<button*/}
                    {/*    className="edit-button"*/}
                    {/*    onClick={(e) => {*/}
                    {/*        e.stopPropagation();*/}
                    {/*        onEdit(student.user.id);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    ✏️ Edit*/}
                    {/*</button>*/}

                    <div onClick={(e) => e.stopPropagation()}>
                        <DeleteButton id={student.user.id} onDelete={onDelete}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
