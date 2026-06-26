import React from 'react';

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="w-full">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchInput;