import React from "react";

const AttendanceJournal = ({loading, students, attendanceMap, handleAttendanceChange, isCompleted, isMentor}) => {
    if (loading) return <p className="text-xs text-gray-500">Loading student list...</p>;
    if (!students || students.length === 0) return <p className="text-xs text-gray-400">No students are assigned to this
        course.</p>;

    return (
        <div>
            <h3 className="font-semibold text-sm mb-2">Attendance Check:</h3>
            <div className="border rounded p-2 bg-gray-50 flex flex-col gap-2">
                {students.map(student => {
                    const isStudentPresent = attendanceMap[student.id] || false;
                    return (
                        <div key={student.id} className="flex items-center justify-between border-b pb-1 last:border-0">
                            <span className="text-sm">{student.name} {student.lastName}</span>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isStudentPresent}
                                    onChange={() => handleAttendanceChange(student.id)}
                                    disabled={isCompleted || !isMentor}
                                    className="w-4 h-4 accent-green-600"
                                />
                                <span className="text-xs text-gray-600">
                                    {isStudentPresent ? "Present" : "Absent"}
                                </span>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AttendanceJournal;
