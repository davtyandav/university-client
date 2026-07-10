import React, {useEffect, useState, useCallback} from "react";
import {createLessonDescriptor, getMentors, getCourses} from "../../services/api";
import "../../styles/lessonsForm.css";

const LessonDescriptionModal = ({onClose}) => {
    const [mentors, setMentors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        type: 'GROUP',
        lessonDayType: 'ODD_DAY',
        startDate: '',
        lessonTime: '',
        mentorId: ''
    });

    useEffect(() => {
        getMentors()
            .then(data => setMentors(data))
            .catch(err => console.error("Failed to load mentors:", err));

        setLoadingCourses(true);
        getCourses()
            .then(data => {
                setCourses(data);
                setLoadingCourses(false);
            })
            .catch(err => {
                setLoadingCourses(false);
            });
    }, []);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }, []);

    const handleCheckboxChange = (courseTitle) => {
        setSelectedLessons(prev => {
            if (prev.includes(courseTitle)) {
                return prev.filter(item => item !== courseTitle);
            } else {
                return [...prev, courseTitle];
            }
        });
    };

    const handleAddLessonsToTitle = () => {
        if (selectedLessons.length === 0) return;

        setFormData(prev => ({
            ...prev,
            title: prev.title
                ? `${prev.title}, ${selectedLessons.join(", ")}`
                : selectedLessons.join(", ")
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            title: formData.title,
            type: formData.type.toUpperCase(),
            lessonDayType: formData.lessonDayType.toUpperCase(),
            startDate: `${formData.startDate}T00:00:00`,
            mentorId: Number(formData.mentorId)
        };

        try {
            await createLessonDescriptor(requestData);
            onClose();
        } catch (error) {
            console.error(error);
            const serverMessage = error.response?.data?.message || "Data validation error";
            alert("The server rejected the data: " + serverMessage);
        }
    };

    return (
        <div onClick={onClose}>
            <div
                className="lesson-form-container relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="lesson-form-title">
                    Add Curriculum Plan
                </h2>

                <form onSubmit={handleSubmit} className="lesson-form">

                    <label>Lesson Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <div
                        className="flex flex-col gap-2 my-2 border p-3 rounded bg-slate-50 max-h-[160px] overflow-y-auto">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                            Available Courses from DB:
                        </span>

                        {loadingCourses ? (
                            <p className="text-xs text-slate-400 italic">Loading courses...</p>
                        ) : courses.length > 0 ? (
                            courses.map((course) => (
                                <label
                                    key={course.id}
                                    className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-slate-900"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedLessons.includes(course.title)}
                                        onChange={() => handleCheckboxChange(course.title)}
                                        className="w-3.5 h-3.5 accent-blue-600 rounded"
                                    />
                                    {course.title}
                                </label>
                            ))
                        ) : (
                            <p className="text-xs text-rose-500 italic">No courses found in database.</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddLessonsToTitle}
                        disabled={selectedLessons.length === 0}
                        className="mt-1 px-4 py-1.5 text-xs font-bold rounded bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition self-start"
                    >
                        Apply Selected to Title
                    </button>

                    <label className="mt-3">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="GROUP">GROUP</option>
                        <option value="SINGLE">SINGLE</option>
                    </select>

                    <label>Day Type</label>
                    <select
                        name="lessonDayType"
                        value={formData.lessonDayType}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="ODD_DAY">ODD_DAY</option>
                        <option value="EVEN_DAY">EVEN_DAY</option>
                    </select>

                    <label>Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <label>Time</label>
                    <input
                        type="time"
                        name="lessonTime"
                        value={formData.lessonTime}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <label>Mentor</label>
                    <select
                        name="mentorId"
                        value={formData.mentorId}
                        onChange={handleChange}
                        className="input-field"
                        required
                    >
                        <option value="">Select mentor</option>
                        {mentors.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.user.name} {m.user.lastName}
                            </option>
                        ))}
                    </select>

                    <div className="btnGroup mt-4">
                        <button type="submit" className="saveBtn">
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="cancelBtn"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LessonDescriptionModal;
