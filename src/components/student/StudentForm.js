import React, {useEffect, useState, useCallback} from 'react';
import {createStudent, getMentors, updateStudent, getUsersByRole} from '../../services/api';
import FileUploader from "../FileUploader";

const StudentForm = ({student, onClose, onSuccess}) => { // Добавили onSuccess в пропсы
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
                if (!student) {
                    const users = await getUsersByRole('STUDENT');
                    setAvailableUsers(users);
                }

                const mentorData = await getMentors();
                setMentors(mentorData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [student]);

    useEffect(() => {
        if (student) {
            setFormData({
                userId: student.user?.id || '',
                birthDate: student.birthDate ? student.birthDate.split('T')[0] : '',
                mentorId: student.mentor?.id || '',
            });
        } else {
            setFormData({userId: '', birthDate: '', mentorId: ''});
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

        const requestData = {
            userId: parseInt(formData.userId),
            birthDate: formData.birthDate,
            mentorId: parseInt(formData.mentorId)
        };

        try {
            student
                ? await updateStudent(student.id, requestData)
                : await createStudent(formData);
            onClose();
        } catch (error) {
            console.error("Error saving student:", error);
            alert("Не удалось сохранить данные студента.");
        }
    };

    return (
        <div className="form space-y-4 p-4">
            <h2 className="text-xl font-bold">{student ? 'Edit Student' : 'Add Student'}</h2>

            <div className="flex flex-col">
                <label className="font-medium">Select Registered User:</label>
                <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    disabled={!!student}
                    className="login-input border p-2 rounded"
                >
                    {student ? (
                        <option value={formData.userId}>
                            {student.user?.name} {student.user?.lastName}
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

            <div className="flex flex-col">
                <label className="font-medium">Assign Mentor:</label>
                <select
                    name="mentorId"
                    value={formData.mentorId}
                    onChange={handleChange}
                    required
                    className="login-input border p-2 rounded"
                >
                    <option value="">-- Choose Mentor --</option>
                    {mentors.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.user?.name} {m.user?.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="section-btn">
                <button className="saveBtn" type="button" onClick={handleSubmit}>Save</button>
                <button className="cancelBtn" type="button" onClick={onClose}>Cancel</button>
            </div>

            {/*<FileUploader />*/}
        </div>
    );
};

export default StudentForm;