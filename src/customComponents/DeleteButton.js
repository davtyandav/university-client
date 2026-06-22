import React from 'react';

export default function DeleteButton({ id, onDelete }) {
    return (
        <button
            className="deletebutton bg-red-100 text-white p-2 rounded hover:bg-red-600"
            onClick={(e) => {
                e.stopPropagation(); // kardal card click-ic propagation
                onDelete(id);        // delete karel nkar@
            }}
        >
            <span className="text-white text-1 " >🗑️ Delete</span>
        </button>
    );
}