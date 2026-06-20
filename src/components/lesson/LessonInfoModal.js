import React, { useEffect, useState } from "react";
import { getStudentsByLessonDescriptor } from "../../services/api";
import AttendanceJournal from "./AttendanceJournal";
import AssignmentList from "./AssignmentList";
import axios from "axios";
import "../../styles/lessonsForm.css";

const LessonInfoModal = ({ onClose, params, initialLessonData, onLessonUpdated }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [lessonTitle, setLessonTitle] = useState(initialLessonData?.title || "");
    const [attendanceMap, setAttendanceMap] = useState({});
    const [assignments, setAssignments] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [activeAssignmentId, setActiveAssignmentId] = useState(null);
    const [submittedAssignmentIds, setSubmittedAssignmentIds] = useState([]);
    const [studentComment, setStudentComment] = useState("");
    const [uploading, setUploading] = useState(false);

    const isCompleted = initialLessonData?.completed;
    const isMentor = !!onLessonUpdated;

    useEffect(() => {
        if (params) fetchStudents(params.descriptorId, params.lessonId);
    }, [params]);

    const fetchStudents = (descriptorId, lessonId) => {
        setLoading(true);
        getStudentsByLessonDescriptor(descriptorId, lessonId)
            .then(async (data) => {
                if (data && data.students) {
                    setStudents(data.students);
                    const initialAttendance = {};
                    data.students.forEach(st => { initialAttendance[st.id] = st.present; });
                    setAttendanceMap(initialAttendance);

                    if (!isMentor && params.studentId) {
                        try {
                            const subResponse = await axios.get(`http://localhost:8080/api/v1/submissions/student/${params.studentId}`, { withCredentials: true });
                            setSubmittedAssignmentIds(subResponse.data.map(sub => sub.assignmentId));
                        } catch (err) {
                            console.error("Не удалось загрузить историю сдачи задач:", err);
                        }
                    }
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleAttendanceChange = (studentId) => {
        if (isCompleted || !isMentor) return;
        setAttendanceMap(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleAddAssignment = () => {
        if (!newTaskTitle.trim()) return;
        setAssignments([...assignments, { title: newTaskTitle, description: "", deadline: null }]);
        setNewTaskTitle("");
    };

    const handleCompleteLesson = async () => {
        const presentStudentIds = Object.keys(attendanceMap).filter(id => attendanceMap[id]).map(Number);
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/lessons/${params.lessonId}/complete`, { title: lessonTitle, presentStudentIds, assignments }, { withCredentials: true });
            if (onLessonUpdated) onLessonUpdated(response.data);
            onClose();
        } catch (error) {
            console.error("Ошибка при сохранении данных урока:", error);
        }
    };

    const handleSubmitSubmission = async (assignmentId) => {
        if (!studentComment.trim()) return;
        setUploading(true);
        try {
            await axios.post("http://localhost:8080/api/v1/submissions", { assignmentId, studentId: params.studentId, studentComment, fileId: null }, { withCredentials: true });
            setSubmittedAssignmentIds([...submittedAssignmentIds, assignmentId]);
            setActiveAssignmentId(null);
            setStudentComment("");
            fetchStudents(params.descriptorId, params.lessonId);
        } catch (error) {
            console.error("Ошибка при сдаче задания:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            {/* БЛОК 1: ТЕМА УРОКА */}
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm">Тема занятия:</label>
                <input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} disabled={isCompleted || !isMentor} className="border p-2 rounded w-full text-sm" />
            </div>

            {/* БЛОК 2: ЖУРНАЛ ПОСЕЩАЕМОСТИ */}
            <AttendanceJournal
                loading={loading} students={students} attendanceMap={attendanceMap}
                handleAttendanceChange={handleAttendanceChange} isCompleted={isCompleted} isMentor={isMentor}
            />

            {/* БЛОК 3: ЗАДАЧИ К УРОКУ */}
            <AssignmentList
                isCompleted={isCompleted} initialLessonData={initialLessonData} assignments={assignments} isMentor={isMentor} params={params} students={students}
                submittedAssignmentIds={submittedAssignmentIds} activeAssignmentId={activeAssignmentId} setActiveAssignmentId={setActiveAssignmentId}
                studentComment={studentComment} setStudentComment={setStudentComment} uploading={uploading} handleSubmitSubmission={handleSubmitSubmission}
            />

            {/* ФОРМА ДОБАВЛЕНИЯ ЗАДАЧ ДЛЯ МЕНТОРА */}
            {!isCompleted && isMentor && (
                <div className="bg-gray-100 p-2 rounded flex flex-col gap-2 border">
                    <input type="text" placeholder="Название задачи..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="border p-1 text-xs rounded bg-white w-full" />
                    <button type="button" onClick={handleAddAssignment} className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 self-end">+ Добавить</button>
                </div>
            )}

            {/* КНОПКИ ЗАКРЫТИЯ */}
            <div className="flex gap-2 mt-2">
                {!isCompleted && isMentor && <button onClick={handleCompleteLesson} className="bg-green-600 text-white font-medium py-2 px-4 rounded text-sm flex-1">Сохранить и завершить</button>}
                <button onClick={onClose} className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded text-sm flex-1">Закрыть</button>
            </div>
        </div>
    );
};

export default LessonInfoModal;