import React from 'react';
import MentorReportsSection from './MentorReportsSection';

const MentorCardRow = ({ group, onCalculate }) => {
    const hasMentor = group.mentorInfo;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50/60 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        hasMentor ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                        {hasMentor ? `${hasMentor.name[0]}${hasMentor.lastName[0]}`.toUpperCase() : '?'}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-base">
                            {hasMentor ? `${hasMentor.name} ${hasMentor.lastName}` : 'No Mentor Assigned'}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                            {hasMentor ? hasMentor.email : 'Courses awaiting teacher assignment'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                    {hasMentor && (
                        <button
                            onClick={() => onCalculate(group.fullMentorObject)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition"
                        >
                            💵 Calculate & Generate PDF
                        </button>
                    )}
                    <span className="px-2.5 py-1 bg-slate-200/60 text-slate-600 text-xs font-semibold rounded-lg">
                        Courses: {group.items.length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white">

                <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Teaching Groups</h4>
                    {group.items.map((descriptor) => (
                        <div key={descriptor.id} className="p-3 hover:bg-slate-50/40 rounded-xl border border-transparent hover:border-slate-100 transition duration-200 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h5 className="font-bold text-slate-800 text-sm tracking-wide">
                                    {descriptor.title.toUpperCase()}
                                </h5>
                                <span className={`text-[9px] tracking-wider uppercase font-extrabold px-1.5 py-0.5 rounded ${
                                    descriptor.dayType === 'ODD_DAY'
                                        ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                }`}>
                                    {descriptor.dayType === 'ODD_DAY' ? 'Odd' : 'Even'}
                                </span>
                            </div>
                            <div className="text-right text-xs text-slate-500">
                                <p>Students: <span className="font-semibold text-slate-800">{descriptor.studentResponses?.length || 0}</span></p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Official Financial Statements</h4>
                    <MentorReportsSection mentorId={group.mentorId} />
                </div>

            </div>
        </div>
    );
};

export default MentorCardRow;