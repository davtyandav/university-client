import React, {useState, useEffect} from 'react';
import {getMentors} from '../../services/api';
import MentorReportsSection from './MentorReportsSection';
import SalaryModal from '../SalaryModal';

const SalaryReportsInfo = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        setLoading(true);
        getMentors()
            .then(data => {
                setMentors(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load mentors for finance panel:", err);
                setLoading(false);
            });
    }, []);

    const handleReportGenerated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    if (loading) {
        return <div className="p-6 text-slate-500 text-sm">Loading finance dashboard...</div>;
    }

    if (mentors.length === 0) {
        return (
            <div
                className="flex items-center justify-center p-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No mentors found in the system</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4 p-2">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Finance Management Dashboard</h2>

            {mentors.map((mentor) => {
                const user = mentor.user;
                if (!user) return null;

                return (
                    <div
                        key={`${mentor.id}-${refreshTrigger}`}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-5 flex flex-col gap-4"
                    >
                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                    {`${user.name[0]}${user.lastName[0]}`.toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-base">
                                        {user.name} {user.lastName}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Official Financial Statements
                            </h4>
                            <MentorReportsSection mentorId={mentor.id}/>
                        </div>
                    </div>
                );
            })}

            {selectedMentor && (
                <SalaryModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedMentor(null);
                    }}
                    mentor={selectedMentor}
                    isAdmin={true}
                    onReportGenerated={handleReportGenerated}
                />
            )}
        </div>
    );
};

export default SalaryReportsInfo;