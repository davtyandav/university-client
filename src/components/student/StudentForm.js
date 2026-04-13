import React, {useEffect, useState, useCallback} from 'react';
import {createStudent, getMentors, updateStudent, getUsersByRole} from '../../services/api'; // Добавь метод в api.js
import FileUploader from "../FileUploader";

const StudentForm = ({student, onClose}) => {
    const [formData, setFormData] = useState({
        userId: '',
        birthDate: '',
        mentorId: '',
    });

    const [availableUsers, setAvailableUsers] = useState([]);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getUsersByRole('STUDENT');
                setAvailableUsers(users);

                const mentorData = await getMentors();
                setMentors(mentorData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        if (student) {
            setFormData({
                userId: student.user?.id || '',
                birthDate: student.birthDate ? student.birthDate.split('T')[0] : '',
                mentorId: student.mentor?.id || '',
            });
        }
    }, [student]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Валидация: теперь нам нужен именно userId
        // if (!formData.userId || !formData.birthDate || !formData.mentorId) {
        //     alert("Please select a student, date and mentor.");
        //     return;
        // }

        console.log(student)
        try {
            student
                ? await updateStudent(student.id, formData)
                : await createStudent(formData);
            onClose();
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    return (
        <div className="form">
            <h2>{student ? 'Edit Student' : 'Add Student'}</h2>

            <label>Select Registered User:</label>
            <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                disabled={!!student}
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
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />

            <label>Assign Mentor:</label>
            <select
                name="mentorId"
                value={formData.mentorId}
                onChange={handleChange}
                required
                className="login-input"
            >
                <option value="">-- Choose Mentor --</option>
                {mentors.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.user?.name} {m.user?.lastName}
                    </option>
                ))}
            </select>

            <div className="section-btn">
                <button className="saveBtn" type="button" onClick={handleSubmit}>Save</button>
                <button className="cancelBtn" type="button" onClick={onClose}>Cancel</button>
            </div>

            <FileUploader/>
        </div>
    );
};

export default StudentForm;