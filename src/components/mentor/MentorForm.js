import React, { useEffect, useState, useCallback } from 'react';
import { createMentor, updateMentor, getUsersByRole } from '../../services/api';
import FileUploader from "../FileUploader";

const MentorForm = ({ mentor, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        userId: '',
        birthDate: '',
    });

    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (!mentor) {
                    const users = await getUsersByRole('MENTOR');
                    setAvailableUsers(users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [mentor]);

    useEffect(() => {
        if (mentor) {
            setFormData({
                userId: mentor.user?.id || mentor.userId || '',
                birthDate: mentor.birthDate ? mentor.birthDate.split('T')[0] : '',
            });
        } else {
            setFormData({ userId: '', birthDate: '' });
        }
    }, [mentor]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!formData.userId || !formData.birthDate) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        const requestData = {
            userId: parseInt(formData.userId),
            birthDate: formData.birthDate
        };

        try {
            if (mentor) {
                await updateMentor(mentor.id, requestData);
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
        <div className="form space-y-4 p-4">
            <h2 className="text-xl font-bold">{mentor ? 'Edit Mentor' : 'Add Mentor'}</h2>

            <div className="flex flex-col">
                <label className="font-medium">Select Registered User:</label>
                <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    disabled={!!mentor}
                    className="login-input border p-2 rounded"
                >
                    {mentor ? (
                        <option value={formData.userId}>
                            {mentor.user?.name} {mentor.user?.lastName}
                        </option>
                    ) : (
                        <>
                            <option value="">-- Choose User --</option>
                            {availableUsers.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name} {u.lastName}
                                </option>
                            ))}
                        </>
                    )}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="font-medium">Birth Date:</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
            </div>

            <div className="section-btn">
                <button className="saveBtn" type="button" onClick={handleSubmit}>Save</button>
                <button className="cancelBtn" type="button" onClick={onClose}>Cancel</button>
            </div>

            {/*{mentor && (*/}
            {/*    <div className="mt-6 border-t pt-4">*/}
            {/*        <p className="text-sm text-gray-500 mb-2">Documents & Photo:</p>*/}
            {/*        <FileUploader mentorId={mentor.id} />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default MentorForm;