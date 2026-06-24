import React, { useState } from 'react';
import { createCourse } from '../services/api';

const CourseCreateModal = ({ onClose, onRefresh }) => {
    const [courseTitle, setCourseTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!courseTitle.trim()) {
            setError("Course name cannot be empty");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await createCourse({ title: courseTitle.trim() });

            if (onRefresh) onRefresh();
            onClose();
        } catch (err) {
            console.error("Failed to create course:", err);
            setError("Server error. Failed to save the course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-800">
            <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    ✨ Add New Base Course
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                    Создание корневого курса (направления) в системе.
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="course-title-input" className="text-xs font-semibold text-slate-600">
                    Course Name / Title:
                </label>
                <input
                    id="course-title-input"
                    type="text"
                    disabled={loading}
                    value={courseTitle}
                    onChange={(e) => {
                        setCourseTitle(e.target.value);
                        if (error) setError("");
                    }}
                    placeholder="e.g., Java Advanced 2026, Frontend Core"
                    className="w-full border border-slate-200 bg-white p-2.5 rounded text-xs focus:outline-none focus:border-slate-400 font-medium transition-colors"
                />
                {error && (
                    <span className="text-[10px] text-rose-600 font-medium">
                        ⚠️ {error}
                    </span>
                )}
            </div>

            <div className="flex gap-2 justify-end mt-2 pt-3 border-t border-slate-100">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="bg-white border border-slate-200 text-slate-700 font-medium text-xs px-3 py-2 rounded hover:bg-slate-50 transition active:scale-95"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition active:scale-95 shadow-sm"
                >
                    {loading ? "Saving..." : "Save Course"}
                </button>
            </div>
        </form>
    );
};

export default CourseCreateModal;