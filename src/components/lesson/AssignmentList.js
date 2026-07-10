import React from "react";

const AssignmentList = ({
                            isCompleted, initialLessonData, assignments, isMentor, params, students,
                            submittedAssignmentIds, activeAssignmentId, setActiveAssignmentId,
                            studentComment, setStudentComment, uploading, handleSubmitSubmission
                        }) => {

    const taskList = isCompleted ? (initialLessonData?.assignments || []) : assignments;

    return (
        <div className="pt-5 mt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-800 tracking-tight flex items-center gap-2">
                    📋 Lesson Tasks
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
                        {taskList.length}
                    </span>
                </h3>
            </div>

            <div className="flex flex-col gap-4">
                {taskList.map((task, idx) => {
                    const displayedSubmissions = isMentor
                        ? (task.submissions || [])
                        : (task.submissions || []).filter(sub => Number(sub.studentId) === Number(params.studentId));

                    return (
                        <div
                            key={idx}
                            className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md/50 transition-all duration-200 flex flex-col gap-3"
                        >
                            {/* Task Information */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1">
                                    {task.title}
                                </h4>
                                {task.description && (
                                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 italic">
                                        <b className="not-italic text-slate-700 font-medium">Description:</b> {task.description}
                                    </p>
                                )}
                            </div>

                            {task.deadline && (
                                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                                    🕒 Deadline: <span
                                    className="text-slate-500">{new Date(task.deadline).toLocaleDateString()}</span>
                                </div>
                            )}

                            {displayedSubmissions.length > 0 && (
                                <div className="flex flex-col gap-2 mt-1">
                                    {displayedSubmissions.map((submission, subIdx) => {
                                        const matchingStudent = students.find(s => Number(s.id) === Number(submission.studentId));
                                        const authorName = submission.studentName
                                            ? `${submission.studentName} ${submission.studentLastName || ''}`
                                            : matchingStudent
                                                ? `${matchingStudent.name} ${matchingStudent.lastName || ''}`
                                                : `Student (ID: ${submission.studentId})`;

                                        return (
                                            <div
                                                key={subIdx}
                                                className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 flex flex-col gap-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                        ✨ {isMentor ? `Submission from: ${authorName}` : "Your submission has been sent"}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium">
                                                        {new Date(submission.submittedAt).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-700 bg-white/80 p-2 rounded-lg border border-emerald-50/50 font-mono italic">
                                                    "{submission.studentComment}"
                                                </p>

                                                {/* Grade / Feedback Block */}
                                                {submission.grade ? (
                                                    <div
                                                        className="pt-2 mt-1 border-t border-emerald-100/60 flex flex-col gap-1">
                                                        <div
                                                            className="text-xs font-bold text-blue-600 flex items-center gap-1">
                                                            🎯 Grade: <span
                                                            className="bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">{submission.grade}</span>
                                                        </div>
                                                        {submission.mentorFeedback && (
                                                            <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100 mt-1">
                                                                <b className="text-slate-700">Mentor
                                                                    Feedback:</b> {submission.mentorFeedback}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="w-fit text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded mt-1 animate-pulse">
                                                        ⏳ Awaiting mentor review
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* STUDENT SUBMISSION INPUT FIELD */}
                            {!isMentor && isCompleted && displayedSubmissions.length === 0 && (
                                <div className="mt-2 pt-3 border-t border-slate-100">
                                    {submittedAssignmentIds.includes(task.id) ? (
                                        <div
                                            className="text-emerald-600 font-semibold text-[11px] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg w-fit flex items-center gap-1 shadow-sm">
                                            ✓ Submission successfully sent to the server
                                        </div>
                                    ) : activeAssignmentId !== task.id ? (
                                        <button
                                            type="button"
                                            onClick={() => setActiveAssignmentId(task.id)}
                                            className="w-full bg-slate-900 text-white font-medium text-xs py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors active:scale-[0.99] duration-150 shadow-sm flex items-center justify-center gap-1"
                                        >
                                            📥 Submit Solution
                                        </button>
                                    ) : (
                                        <div
                                            className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2.5 shadow-inner">
                                            <label className="text-[11px] font-semibold text-slate-700">
                                                Your response to the task:
                                            </label>
                                            <textarea
                                                placeholder="Write a comment (e.g., completed)..."
                                                value={studentComment}
                                                onChange={(e) => setStudentComment(e.target.value)}
                                                className="w-full p-2.5 border border-slate-200 bg-white rounded-lg text-xs h-20 resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all placeholder:text-slate-400"
                                            />
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveAssignmentId(null)}
                                                    className="bg-white border border-slate-200 text-slate-700 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 active:scale-95 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleSubmitSubmission(task.id)}
                                                    disabled={uploading}
                                                    className="bg-emerald-600 text-white font-semibold text-xs px-4 py-1.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 active:scale-95 transition-all shadow-sm shadow-emerald-600/10"
                                                >
                                                    {uploading ? "Sending..." : "Submit"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AssignmentList;