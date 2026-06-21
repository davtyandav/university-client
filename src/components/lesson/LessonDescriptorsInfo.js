import React, {useMemo} from 'react';

const LessonDescriptorsInfo = ({descriptors}) => {

    const groupedByMentor = useMemo(() => {
        const groups = {};

        descriptors.forEach((descriptor) => {
            const mentor = descriptor.mentorResponse;
            const mentorId = mentor ? mentor.id : 'no-mentor';

            if (!groups[mentorId]) {
                groups[mentorId] = {
                    mentorInfo: mentor ? mentor.user : null,
                    items: []
                };
            }
            groups[mentorId].items.push(descriptor);
        });

        return Object.values(groups);
    }, [descriptors]);

    if (descriptors.length === 0) {
        return (
            <div
                className="flex items-center justify-center p-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">The descriptor list is empty</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 p-2">
            {groupedByMentor.map((group, idx) => {
                const hasMentor = group.mentorInfo;

                return (
                    <div
                        key={hasMentor ? `mentor-${idx}` : 'no-mentor-group'}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div
                            className="bg-slate-50/60 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                                        hasMentor ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {hasMentor
                                        ? `${hasMentor.name[0]}${hasMentor.lastName[0]}`.toUpperCase()
                                        : '?'
                                    }
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-base">
                                        {hasMentor
                                            ? `${hasMentor.name} ${hasMentor.lastName}`
                                            : 'No Mentor Assigned'
                                        }
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {hasMentor ? hasMentor.email : 'Courses awaiting teacher assignment'}
                                    </p>
                                </div>
                            </div>

                            <span
                                className="self-start sm:self-center px-2.5 py-1 bg-slate-200/60 text-slate-600 text-xs font-semibold rounded-lg">
                                Courses: {group.items.length}
                            </span>
                        </div>

                        <div className="p-4 bg-white divide-y divide-slate-100">
                            {group.items.map((descriptor) => (
                                <div
                                    key={descriptor.id}
                                    className="p-4 hover:bg-slate-50/40 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <h4 className="font-bold text-slate-800 text-base tracking-wide">
                                            {descriptor.title.toUpperCase()}
                                        </h4>
                                        <span
                                            className={`text-[10px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded ${
                                                descriptor.dayType === 'ODD_DAY'
                                                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                            }`}>
                                            {descriptor.dayType === 'ODD_DAY' ? 'Odd Days' : 'Even Days'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="text-left sm:text-right space-y-0.5">
                                            <p className="text-slate-500 font-medium">
                                                Students: <span
                                                className="font-semibold text-slate-800">{descriptor.studentResponses?.length || 0}</span>
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Type: {descriptor.type} • ID: {descriptor.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LessonDescriptorsInfo;
