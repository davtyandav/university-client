import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUsers } from '../../services/api';
import SearchInput from '../../customComponents/SearchInput';
import Pagination from '../../customComponents/Pagination';
import avatar from '../../assets/user.png';
import '../../styles/app.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsersServerSide(currentPage, searchTerm);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [currentPage, searchTerm]);

    const fetchUsersServerSide = (page, search) => {
        getUsers(page, search)
            .then(response => {
                setUsers(response.data || []);
                setTotalPages(response.totalPages || 1);
            })
            .catch(err => console.error("Error loading users from server:", err));
    };

    const handleSearchChange = (newSearchTerm) => {
        const newParams = new URLSearchParams(searchParams);
        if (newSearchTerm) {
            newParams.set('search', newSearchTerm);
        } else {
            newParams.delete('search');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handlePageChange = (pageNumber) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', pageNumber.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="w-full">
            <div className="mx-5 mt-5">
                <SearchInput
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by first name, last name, or email..."
                />
            </div>

            <div className="p-2 m-5 bg-white shadow-sm rounded">
                <div className="list">
                    {users.length > 0 ? (
                        users.map((user) => (
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
                            No users found
                        </div>
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default UserList;