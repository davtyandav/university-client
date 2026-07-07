import React, { useEffect, useState } from 'react';
import { getMentorById, getMentorReportsApi, downloadSalaryReportFile } from '../../services/api';
import { calculateAge } from '../../services/utils';
import Modal from "../Modal";
import MentorForm from "../mentor/MentorForm";
import LessonDescriptor from './LessonDescriptor';
import SalaryModal from '../SalaryModal';
import "../../styles/mentorprofile.css";

const MentorProfile = ({ userId }) => {
    const [mentorData, setMentorData] = useState(null);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);

    const loadMentorData = () => {
        if (userId) {
            getMentorById(userId)
                .then(data => {
                    console.log("Mentor Data loaded:", data);
                    setMentorData(data);
                    return getMentorReportsApi(data.id);
                })
                .then(reportsData => {
                    console.log("Reports loaded:", reportsData);
                    setReports(reportsData);
                })
                .catch(err => {
                    console.error("Error in data workflow:", err);
                    setError("Failed to load profile or financial information");
                });
        }
    };

    useEffect(() => {
        loadMentorData();
    }, [userId]);

    const handleDownload = async (reportId) => {
        setDownloadingId(reportId);
        try {
            await downloadSalaryReportFile(reportId);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Could not download PDF. Please try again.");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateSuccess = (updatedData) => {
        setMentorData(updatedData);
        handleCloseModal();
    };

    if (error) return <div className="p-5 text-center text-red-500">{error}</div>;
    if (!mentorData) return null;

    return (
        <div className="profile">
            <div className="flex gap-2">
                <button className="edit-button" onClick={handleOpenModal}>
                    ✏️ Edit profile
                </button>
                <button
                    className="edit-button bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setIsSalaryModalOpen(true)}
                >
                    💵 Calculate Salary
                </button>
            </div>

            <div className="mentor-profile-info">
                <div className="mentor-profile-card">
                    <h3>Date of Birth</h3>
                    <p>
                        {mentorData.birthDate ? mentorData.birthDate.split('T')[0] : "Not specified"}
                        {mentorData.birthDate && calculateAge(mentorData.birthDate)}
                    </p>
                </div>

                <div className="info-card">
                    <h3>Active Courses</h3>
                    <p>{mentorData.lessonDescriptors?.length || 0}</p>
                </div>
            </div>

            <div className="lesson-group">
                <h2>My Teaching Groups</h2>
                {mentorData.lessonDescriptors && mentorData.lessonDescriptors.length > 0 ? (
                    mentorData.lessonDescriptors.map((descriptor) => (
                        <LessonDescriptor key={descriptor.id} descriptor={descriptor} />
                    ))
                ) : (
                    <div className="empty">The mentor has no active descriptors yet</div>
                )}
            </div>

            <div className="mt-8 border-t pt-6 text-gray-800">
                <h2 className="text-xl font-bold mb-4">My Official Financial Reports</h2>
                {reports.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {reports.map((report, index) => (
                            <div key={`${report.id}-${index}`} className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl">
                                <div>
                                    <p className="font-semibold text-sm">
                                        Period: {report.startDate.split('T')[0]} to {report.endDate.split('T')[0]}
                                    </p>
                                    <small className="text-gray-400">Generated: {new Date(report.generatedAt).toLocaleDateString()}</small>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-emerald-700">{report.totalSalary.toFixed(0)} Dram</span>
                                    <button
                                        onClick={() => handleDownload(report.id)}
                                        disabled={downloadingId === report.id}
                                        className="bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
                                    >
                                        {downloadingId === report.id ? "Downloading..." : "Download PDF"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No official salary statements submitted yet.</p>
                )}
            </div>

            <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
                <MentorForm
                    mentor={mentorData}
                    onClose={handleCloseModal}
                    onSuccess={handleUpdateSuccess}
                />
            </Modal>

            <SalaryModal
                isOpen={isSalaryModalOpen}
                onClose={() => setIsSalaryModalOpen(false)}
                mentor={mentorData}
                isAdmin={false}
            />
        </div>
    );
};

export default MentorProfile;