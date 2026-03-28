import React, {useEffect, useState, useCallback} from 'react';
import {createMentor, updateMentor, getUsersByRole} from '../../services/api';
import FileUploader from "../FileUploader";

const MentorForm = ({mentor, onClose}) => {
    const [formData, setFormData] = useState({
        userId: '',
        birthDate: '',
    });

    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsersByRole('MENTOR');
                setAvailableUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (mentor) {
            setFormData({
                userId: mentor.user?.id || mentor.userId || '',
                birthDate: mentor.birthDate ? mentor.birthDate.split('T')[0] : '',
            });
        } else {
            setFormData({userId: '', birthDate: ''});
        }
    }, [mentor]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mentor) {
                await updateMentor(mentor.id, formData);
            } else {
                await createMentor(formData);
            }
            onClose();
        } catch (error) {
            console.error("Error saving mentor:", error);
            alert("Не удалось сохранить данные ментора.");
        }
    };

    return (
        <div className="form">
            <h2>{mentor ? 'Edit Mentor' : 'Add Mentor'}</h2>

            <label>Select Registered User:</label>
            <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                disabled={!!mentor}
                className="login-input"
            >
                <option value="">-- Choose User --</option>
                {availableUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name} {u.lastName}
                    </option>
                ))}
            </select>

            <label>Birth Date:</label>
            <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
            />

            <div className="section-btn">
                <button className="saveBtn" type="button" onClick={handleSubmit}>Save</button>
                <button className="cancelBtn" type="button" onClick={onClose}>Cancel</button>
            </div>

            <FileUploader/>
        </div>
    );
};

export default MentorForm;
