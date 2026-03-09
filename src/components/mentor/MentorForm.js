import React, {useEffect, useState, useCallback} from 'react';
import {createMentor, updateMentor} from '../../services/api';

const MentorForm = ({mentor, onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        birthDate: '',
    });

    useEffect(() => {
        if (mentor) {
            setFormData({
                name: mentor.name || '',
                lastName: mentor.lastName || '',
                email: mentor.email || '',
                birthDate: mentor.birthDate ? mentor.birthDate.split('T')[0] : '',
            });
        } else {
            setFormData({name: '', lastName: '', email: '', birthDate: ''});
        }
    }, [mentor]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.lastName || !formData.email || !formData.birthDate) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            mentor
                ? await updateMentor(mentor.id, formData)
                : await createMentor(formData);
            onClose();
        } catch (error) {
            console.error("Error saving mentor:", error);
        }
    };

    return (
        <div className="form">
            <h2>{mentor ? 'Edit Mentor' : 'Add Mentor'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />

                <div className="section-btn">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default MentorForm;
