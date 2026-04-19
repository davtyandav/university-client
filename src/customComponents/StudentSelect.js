import React, {useState, useEffect} from 'react';
import {assignDescriptorToStudents, getStudents} from '../services/api';
import '../styles/app.css';

const StudentSelect = ({descriptorId, onClose}) => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Selected students:', selectedStudents);
        console.log('descriptorId', descriptorId);


        if (selectedStudents.length === 0) {
            alert("Выберите хотя бы одного студента");
            return;
        }
        try {
            await assignDescriptorToStudents(descriptorId, selectedStudents);

            console.log('Данные успешно сохранены');
            onClose(); // Закрываем модальное окно после успеха
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

export default StudentSelect;