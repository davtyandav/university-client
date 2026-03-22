import React from 'react'
import avatar from '../assets/user.png';
import DeleteButton from "../customComponents/DeleteButton";

export default function Card({ student, onEdit, onDelete, onClick }) {
  return (
     <div
            className="card"
            onClick={() => onClick(student.id)}
        >
            <div className="card-avatar">
                <img src={avatar} alt="User Avatar" />
            </div>

            <div className="card-info">
                <h3 className="card-name">
                    {student.name} {student.lastName}
                </h3>

                {/* <p className="student-id">
                    Student ID: #{student.id}
                </p> */}

                <div className="card-actions">
                    <button
                        className="edit-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(student.id);
                        }}
                    >
                        ✏️ Edit
                    </button>

                    <div onClick={(e) => e.stopPropagation()}>
                        <DeleteButton id={student.id} onDelete={onDelete} />
                    </div>
                </div>
            </div>

            
        </div>
  )
}
