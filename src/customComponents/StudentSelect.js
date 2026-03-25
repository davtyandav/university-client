import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';
import '../styles/list.css';

const StudentSelect = ({ descriptorId, onClose }) => {

    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        getStudents()
            .then(data => setStudents(data))
            .catch(error => console.log(error));
    };

    const handleCheckboxChange = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Selected students:', selectedStudents);

        // API call այստեղ
    };

    return (
        <div className="studentSelect">
            <h2 className="title">Выбор студентов</h2>

            <form onSubmit={handleSubmit}>

                <div className="studentList">
                    {students.map(student => (
                        <label key={student.id} className="studentItem">
                            <input
                                type="checkbox"
                                checked={selectedStudents.includes(student.id)}
                                onChange={() => handleCheckboxChange(student.id)}
                            />
                            <span>
                                {student.name} {student.lastName}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="btnGroup">
                    <button type="submit" className="saveBtn">
                        Сохранить
                    </button>
                    <button type="button" onClick={onClose} className="cancelBtn">
                        Отмена
                    </button>
                </div>

            </form>
        </div>
    );
};

export default StudentSelect;