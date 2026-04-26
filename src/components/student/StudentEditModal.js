import React, {useCallback, useEffect, useState} from 'react';
import {updateStudent} from '../../services/api';

const StudentEditModal = ({student, onClose}) => {
    const [formData, setFormData] = useState({
        birthDate: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                birthDate: student.birthDate ? student.birthDate.split('T')[0] : '',
            });
        }
    }, [student]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            birthDate: formData.birthDate,
        };

        try {
            if (student?.id) {
                await updateStudent(student.id, requestData);
                onClose();
            }
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Не удалось обновить дату рождения.");
        }
    };

    return (
        <div className="form space-y-4 p-4">
            <h2 className="text-xl font-bold">Edit Student Date</h2>

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
        </div>
    );
};

export default StudentEditModal;