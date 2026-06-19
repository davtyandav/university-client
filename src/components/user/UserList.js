import React, {useEffect, useState} from 'react';
import {getUsers, toggleUserStatus} from '../../services/api'; // Предположим, ты добавил метод смены статуса
import avatar from '../../assets/user.png';
import '../../styles/app.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getUsers()
            .then(data => setUsers(data))
            .catch(err => console.error("Ошибка при загрузке пользователей:", err));
    };

    return (
        <div className="w-full">
            <div className="p-2 m-5 bg-white shadow-sm rounded">
                <div className="list">
                    {users.map((user) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
