import React, {useEffect, useState} from 'react';
import {getUsers, getUserById, deleteUser} from '../../services/api';
import Modal from "../Modal";
// import UserForm from "./UserForm"; // Нужно будет создать этот компонент
import avatar from '../../assets/user.png';
import '../../styles/app.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getUsers()
            .then(data => setUsers(data))
            .catch(err => console.error("Ошибка при загрузке пользователей:", err));
    };

    const handleAddUser = () => {
        setIsAddModalOpen(true);
    };

    const handleEditUser = (id) => {
        // getUserById(id)
        //     .then(data => {
        //         setEditingUser(data);
        //         setIsEditModalOpen(true);
        //     })
        //     .catch(err => console.error(err));
    };

    const handleOpenInfo = (id) => {
        // getUserById(id)
        //     .then(data => {
        //         setUserInfo(data);
        //         setIsInfoModalOpen(true);
        //     })
        //     .catch(err => console.error(err));
    };

    const handleDeleteUser = (id) => {
        // if (window.confirm("Вы уверены, что хотите удалить пользователя?")) {
        //     deleteUser(id)
        //         .then(() => {
        //             console.log("Deleted user id:", id);
        //             fetchUsers();
        //         })
        //         .catch(err => console.error(err));
        // }
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsInfoModalOpen(false);
        setEditingUser(null);
        fetchUsers(); // Обновляем список после любых изменений
    };

    return (
        <div className="panel">
            <div className="p-5 m-5 bg-white shadow-sm rounded font-bold">System Users</div>

            <div className="p-2 m-5 bg-white shadow-sm rounded">
                <div className="list">
                    {users.map((user) => (
                        /* UserCard — это упрощенный StudentCard */
                        <div key={user.id}
                             className="user-card-item flex justify-between items-center p-3 border-b hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-3" onClick={() => handleOpenInfo(user.id)}>
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

            {/*/!* Модалка Добавления *!/*/}
            {/*<Modal isOpen={isAddModalOpen} onClose={closeModals}>*/}
            {/*    <UserForm user={null} onClose={closeModals} />*/}
            {/*</Modal>*/}

            {/*/!* Модалка Редактирования *!/*/}
            {/*<Modal isOpen={isEditModalOpen} onClose={closeModals} width="600px">*/}
            {/*    <UserForm user={editingUser} onClose={closeModals} />*/}
            {/*</Modal>*/}

            {/* Модалка Информации */}
            {userInfo && (
                <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} width="500px">
                    <div className="flex flex-col items-center mb-6">
                        <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-blue-50"/>
                        <h2 className="text-2xl font-bold mt-2">{userInfo.name} {userInfo.lastName}</h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mt-1">
                            {userInfo.role}
                        </span>
                    </div>

                    <div className="border rounded-xl overflow-hidden">
                        <div className="flex justify-between p-4 border-b">
                            <span className="text-gray-500">Username</span>
                            <span className="font-medium">{userInfo.username}</span>
                        </div>
                        <div className="flex justify-between p-4 border-b">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium">{userInfo.email}</span>
                        </div>
                        <div className="flex justify-between p-4">
                            <span className="text-gray-500">Status</span>
                            <span className="text-green-600 font-bold">Active</span>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UserList;