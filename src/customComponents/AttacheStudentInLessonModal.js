import React, {useEffect, useState} from 'react';
import {assignDescriptorToStudents, getStudents} from '../services/api';
import '../styles/app.css';

const AttacheStudentInLessonModal = ({descriptorId, onClose}) => {

    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        getStudents()
            .then(data => {
                setStudents(data.filter(student => student.lessonDescriptor == null))
            })
            .catch(error => console.log(error));
    };

    const handleCheckboxChange = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedStudents.length === 0) {
            alert("Выберите хотя бы одного студента");
            return;
        }
        try {
            await assignDescriptorToStudents(descriptorId, selectedStudents);
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            alert('Не удалось сохранить данные');
        }
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
                                {student.user.name} {student.user.lastName}
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

export default AttacheStudentInLessonModal;
