import React from 'react';

export default function DeleteButton({ id, onDelete }) {
    return (
        <button
            className="w-full bg-red-500"
            onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
            }}
        >
            Delete
        </button>
    );
}