import React, {useEffect, useState} from 'react';
import {getUsers} from '../../services/api';
import SearchInput from '../../customComponents/SearchInput';
import avatar from '../../assets/user.png';
import '../../styles/app.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getUsers()
            .then(data => setUsers(data))
            .catch(err => console.error("Error loading users:", err));
    };

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        return (
            user.name?.toLowerCase().includes(search) ||
            user.lastName?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="w-full">
            <div className="mx-5 mt-5">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by first name, last name, or email..."
                />
            </div>

            <div className="p-2 m-5 bg-white shadow-sm rounded">
                <div className="list">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user.id}
                                 className="user-card-item flex justify-between items-center p-3 border-b hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <img src={avatar} alt="u" className="w-10 h-10 rounded-full"/>
                                    <div>
                                        <div className="font-medium">{user.name} {user.lastName}</div>
                                        <div className="text-xs text-gray-400">Email : {user.email} </div>
                                        <div className="text-xs text-gray-400">Role : {user.role} </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-center text-gray-500">
                            Пользователи не найдены
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;
