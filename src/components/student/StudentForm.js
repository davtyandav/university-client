import React, {useEffect, useState, useCallback} from 'react';
import {createStudent, getMentors, updateStudent} from '../../services/api';
import '../../styles/studentForm.css';

const StudentForm = ({student, onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        birthDate: '',
        mentor: {},
    });

    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const mentorData = await getMentors();
                setMentors(mentorData);
            } catch (error) {
                console.error("Error fetching mentors:", error);
            }
        };

        fetchMentors();

        if (student) {
            setFormData({
                name: student.name || '',
                lastName: student.lastName || '',
                email: student.email || '',
                birthDate: student.birthDate ? student.birthDate.split('T')[0] : '',
                mentor: student.mentor || {},
            });
        } else {
            setFormData({name: '', lastName: '', email: '', birthDate: '', mentor: {}});
        }
    }, [student]);

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
            student ? await updateStudent(student.id, formData) : await createStudent(formData);
            onClose();
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    // Найти текущего ментора по ID
    const currentMentor = mentors.find((mentor) => mentor.id === formData.mentorId);

    return (
        <div className="student-form">
            <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name"
                       required/>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email"
                       required/>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required/>

                <select name="mentorId" value={formData.mentor.id} onChange={handleChange} required>
                    <option
                        value={formData.mentor.id}>{currentMentor ? `${currentMentor.name} ${currentMentor.lastName}` : "No mentor"}</option>
                    {mentors.map(({id, name, lastName}) => (
                        <option key={id} value={id}>
                            {name} {lastName}
                        </option>
                    ))}
                </select>

                <div className="section-btn">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
