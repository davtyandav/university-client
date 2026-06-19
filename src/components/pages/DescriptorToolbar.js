import React, {useState} from 'react';
import Modal from "../Modal";
import LessonDescriptionModal from "../lesson/LessonDescriptionModal";
import MountSelect from "../../customComponents/MonthForm";
import StudentSelect from "../../customComponents/StudentSelect";
import './../../styles/descriptorToolbar.css';

const DescriptorToolbar = ({descriptors, onRefresh}) => {
    const [isDescriptorModalOpen, setIsDescriptorModalOpen] = useState(false);
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isLessonStudentModalOpen, setIsLessonStudentModalOpen] = useState(false);
    const [selectedDescriptorId, setSelectedDescriptorId] = useState(null);

    return (
        <div className="toolbar-container">
            <h2 className="toolbar-title">Панель быстрого управления</h2>

            <div className="toolbar-section" style={{backgroundColor: '#eef2f7'}}>
                <div className="flex-container">
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <label htmlFor="toolbar-select" className="toolbar-label">Выбрать курс (дескриптор):</label>
                        <select
                            id="toolbar-select"
                            className="toolbar-select"
                            value={selectedDescriptorId || ""}
                            onChange={(e) => setSelectedDescriptorId(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">-- Выберите дескриптор --</option>
                            {descriptors.map(d => (
                                <option key={d.id} value={d.id}>
                                    [{d.dayType}] {d.type}: {d.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="divider">|</span>

                    <button onClick={() => setIsDescriptorModalOpen(true)} className="addButton btn-green">
                        Добавить дескриптор
                    </button>
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Управление студентами курса</h3>
                <div className="flex-container">
                    <button
                        className="addButton btn-blue"
                        onClick={() => setIsLessonStudentModalOpen(true)}
                        disabled={!selectedDescriptorId}
                    >
                        Attach students in lesson
                    </button>
                    {!selectedDescriptorId && <small style={{color: '#dc3545'}}>* Сначала выберите курс выше</small>}
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Генерация расписания</h3>
                <div className="flex-container">
                    <button
                        className="addButton btn-blue"
                        onClick={() => setIsMonthModalOpen(true)}
                        disabled={!selectedDescriptorId}
                    >
                        Generate lessons
                    </button>
                    {!selectedDescriptorId && <small style={{color: '#dc3545'}}>* Сначала выберите курс выше</small>}
                </div>
            </div>

            <Modal isOpen={isDescriptorModalOpen} onClose={() => setIsDescriptorModalOpen(false)}>
                <LessonDescriptionModal onClose={() => {
                    setIsDescriptorModalOpen(false);
                    if (onRefresh) {
                        onRefresh();
                    }
                }}/>
            </Modal>

            <Modal isOpen={isMonthModalOpen} onClose={() => setIsMonthModalOpen(false)}>
                {selectedDescriptorId && (
                    <MountSelect
                        descriptorId={selectedDescriptorId}
                        onClose={() => setIsMonthModalOpen(false)}
                    />
                )}
            </Modal>

            <Modal isOpen={isLessonStudentModalOpen} onClose={() => setIsLessonStudentModalOpen(false)}>
                {selectedDescriptorId && (
                    <StudentSelect
                        descriptorId={selectedDescriptorId}
                        onClose={() => setIsLessonStudentModalOpen(false)}
                    />
                )}
            </Modal>
        </div>
    );
};

export default DescriptorToolbar;
