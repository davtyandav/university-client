import React, { useState, useEffect } from 'react';
import Modal from "../Modal";
import LessonDescriptionModal from "../lesson/LessonDescriptionModal";
import MonthSelect from "../../customComponents/MonthForm";
import StudentSelect from "../../customComponents/StudentSelect";
import SalaryModal from "../SalaryModal";
import { getMentors } from '../../services/api';
import './../../styles/descriptorToolbar.css';

const DescriptorToolbar = ({ descriptors, onRefresh }) => {
    const [mentors, setMentors] = useState([]);
    const [isDescriptorModalOpen, setIsDescriptorModalOpen] = useState(false);
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [isLessonStudentModalOpen, setIsLessonStudentModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

    const [selectedDescriptorId, setSelectedDescriptorId] = useState(null);
    const [selectedMentorId, setSelectedMentorId] = useState("");

    const currentUserRole = localStorage.getItem('role');
    const isAdmin = currentUserRole === 'ADMIN';

    useEffect(() => {
        if (isAdmin) {
            getMentors()
                .then(data => setMentors(data))
                .catch(err => console.error("Failed to load mentors:", err));
        }
    }, [isAdmin]);

    const selectedMentor = mentors.find(m => Number(m.id) === Number(selectedMentorId));

    return (
        <div className="toolbar-container">
            <h2 className="toolbar-title">Quick Management Toolbar</h2>

            <div className="toolbar-section bg-[#eef2f7]">
                <div className="flex-container">
                    <div className="flex items-center gap-2">
                        <label htmlFor="toolbar-select" className="toolbar-label">
                            Select Course (Descriptor):
                        </label>
                        <select
                            id="toolbar-select"
                            className="toolbar-select"
                            value={selectedDescriptorId || ""}
                            onChange={(e) => setSelectedDescriptorId(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">-- Choose a descriptor --</option>
                            {descriptors.map(d => (
                                <option key={d.id} value={d.id}>
                                    [{d.dayType}] {d.type}: {d.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="divider">|</span>

                    <button
                        onClick={() => setIsDescriptorModalOpen(true)}
                        className="addButton btn-green"
                    >
                        Add Descriptor
                    </button>
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Course Students Management</h3>
                <div className="flex-container">
                    <button
                        className="addButton btn-blue"
                        onClick={() => setIsLessonStudentModalOpen(true)}
                        disabled={!selectedDescriptorId}
                    >
                        Attach students in lesson
                    </button>
                    {!selectedDescriptorId && (
                        <small className="text-[#dc3545]">* Please select a course above first</small>
                    )}
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Schedule Generation</h3>
                <div className="flex-container">
                    <button
                        className="addButton btn-blue"
                        onClick={() => setIsMonthModalOpen(true)}
                        disabled={!selectedDescriptorId}
                    >
                        Generate lessons
                    </button>
                    {!selectedDescriptorId && (
                        <small className="text-[#dc3545]">* Please select a course above first</small>
                    )}
                </div>
            </div>

            {isAdmin && (
                <div className="toolbar-section">
                    <h3 className="section-title">Financial Management</h3>
                    <div className="flex-container">
                        <div className="flex items-center gap-2">
                            <label htmlFor="mentor-salary-select" className="toolbar-label">Select Mentor:</label>
                            <select
                                id="mentor-salary-select"
                                className="toolbar-select"
                                value={selectedMentorId}
                                onChange={(e) => setSelectedMentorId(e.target.value)}
                            >
                                <option value="">-- Choose a mentor --</option>
                                {mentors.map(m => (
                                    <option key={m.id} value={m.id}>
                                        {m.user.name} {m.user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="addButton bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                            onClick={() => setIsSalaryModalOpen(true)}
                            disabled={!selectedMentorId}
                        >
                            💵 Calculate Salary
                        </button>
                    </div>
                </div>
            )}

            <Modal isOpen={isDescriptorModalOpen} onClose={() => setIsDescriptorModalOpen(false)}>
                <LessonDescriptionModal
                    onClose={() => {
                        setIsDescriptorModalOpen(false);
                        if (onRefresh) {
                            onRefresh();
                        }
                    }}
                />
            </Modal>

            <Modal isOpen={isMonthModalOpen} onClose={() => setIsMonthModalOpen(false)}>
                {selectedDescriptorId && (
                    <MonthSelect
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

            {isSalaryModalOpen && selectedMentor && (
                <SalaryModal
                    isOpen={isSalaryModalOpen}
                    onClose={() => setIsSalaryModalOpen(false)}
                    mentor={selectedMentor}
                    isAdmin={isAdmin}
                />
            )}
        </div>
    );
};

export default DescriptorToolbar;