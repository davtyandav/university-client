import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';
const STUDENTS = '/students';
const MENTORS = '/mentors';
const GENERATED = '/generate';
const LESSON_DESCRIPTOR = '/lessonDescriptor';
const LESSON = '/lesson';
const LESSONS = '/lessons';
const USERS = '/users';
const ROLE = '/role';
const ROLES = '/roles';
const LOGIN = '/auth/login';
const REGISTER = '/auth/register';
const ME = '/users/auth/me';
const SEARCH = '/search';
const SALARIES = '/salaries';
const COURSES = '/courses';
const API_COURSES = BASE_URL + COURSES;

const API_USERS_BY_ROLE = BASE_URL + USERS + ROLE;
const API_USERS = BASE_URL + USERS;
const API_STUDENTS = BASE_URL + STUDENTS;
const API_MENTORS = BASE_URL + MENTORS;
const API_LESSON = BASE_URL + LESSON;
const API_LESSON_DESCRIPTOR = BASE_URL + LESSON_DESCRIPTOR;
const API_GENERATED = BASE_URL + LESSONS + GENERATED;
const API_STUDENTS_LESSON_DESCRIPTOR = API_STUDENTS + LESSON_DESCRIPTOR;
const API_ROLES = BASE_URL + ROLES;
const API_REGISTER = BASE_URL + REGISTER;
const API_LOGIN = BASE_URL + LOGIN;
const API_ME = BASE_URL + ME;
const API_STUDENTS_SEARCH = API_STUDENTS + SEARCH;
const API_SALARIES = BASE_URL + SALARIES;

const API = axios.create();

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// --- Students ---

// GET http://localhost:8080/api/v1/students
export const getStudents = async () => {
    const response = await API.get(API_STUDENTS);
    return response.data;
};

// GET http://localhost:8080/api/v1/students/search?hasMentor=...&hasDescriptor=...
export const getFilteredStudents = async (hasMentor, hasDescriptor) => {
    const response = await API.get(API_STUDENTS_SEARCH, {
        params: {
            hasMentor: hasMentor,
            hasDescriptor: hasDescriptor
        }
    });
    return response.data;
};

// POST http://localhost:8080/api/v1/students/attach
export const assignMentorToStudents = async (requestData) => {
    const response = await API.post(API_STUDENTS + "/attach", requestData);
    return response.data;
}

// GET http://localhost:8080/api/v1/students/lessonDescriptor/{lessonDescriptorId}/lesson/{lessonId}
export const getStudentsByLessonDescriptor = async (lessonDescriptorId, lessonId) => {
    const response = await API.get(`${API_STUDENTS_LESSON_DESCRIPTOR}/${lessonDescriptorId}${LESSON}/${lessonId}`);
    return response.data;
};

// GET http://localhost:8080/api/v1/students/{id}
export const getStudentById = async (id) => {
    const response = await API.get(`${API_STUDENTS}/${id}`);
    return response.data;
};

// GET http://localhost:8080/api/v1/students/user/{id}
export const getStudentByUserId = async (id) => {
    const response = await API.get(`${API_STUDENTS}/user/${id}`);
    return response.data;
};

// POST http://localhost:8080/api/v1/students
export const createStudent = async (student) => {
    const response = await API.post(API_STUDENTS, student);
    return response.data;
};

// PUT http://localhost:8080/api/v1/students/{id}
export const updateStudent = async (id, student) => {
    const response = await API.put(`${API_STUDENTS}/${id}`, student);
    return response.data;
};

// PUT http://localhost:8080/api/v1/students/{id}
export const updateStudentStatus = async (id, student) => {
    const response = await API.put(`${API_STUDENTS}/${id}`, student);
    return response.data;
};

// DELETE http://localhost:8080/api/v1/students/{id}
export const deleteStudent = async (id) => {
    await API.delete(`${API_STUDENTS}/${id}`);
};

// POST http://localhost:8080/api/v1/students/lessonDescriptor/{descriptorId}
export const assignDescriptorToStudents = async (descriptorId, studentIds) => {
    const response = await API.post(`${API_STUDENTS_LESSON_DESCRIPTOR}/${descriptorId}`, {
        studentIds: studentIds
    });
    return response.data;
};

// --- Mentors ---

// PUT http://localhost:8080/api/v1/mentors/{id}
export const updateMentor = async (id, mentor) => {
    const response = await API.put(`${API_MENTORS}/${id}`, mentor);
    return response.data;
};

// DELETE http://localhost:8080/api/v1/mentors/{id}
export const deleteMentor = async (id) => {
    await API.delete(`${API_MENTORS}/${id}`);
};

// GET http://localhost:8080/api/v1/mentors
export const getMentors = async () => {
    const response = await API.get(API_MENTORS);
    return response.data;
};

// GET http://localhost:8080/api/v1/mentors/{id}
export const getMentorById = async (id) => {
    const response = await API.get(`${API_MENTORS}/${id}`);
    return response.data;
};

// GET http://localhost:8080/api/v1/lesson/{id}
export const getLessonById = async (id) => {
    const response = await API.get(`${API_LESSON}/${id}`);
    return response.data;
};

// POST http://localhost:8080/api/v1/mentors
export const createMentor = async (mentor) => {
    const response = await API.post(API_MENTORS, mentor);
    return response.data;
};

// --- Lesson Descriptor ---

// GET http://localhost:8080/api/v1/lessonDescriptor
export const getLessonDescriptors = async () => {
    const response = await API.get(API_LESSON_DESCRIPTOR);
    return response.data;
};

// POST http://localhost:8080/api/v1/lessonDescriptor
export const createLessonDescriptor = async (lessonDescriptor) => {
    const response = await API.post(API_LESSON_DESCRIPTOR, lessonDescriptor);
    return response.data;
};

// POST http://localhost:8080/api/v1/lessons/generate
export const generateMount = async (lessonDescriptor) => {
    const response = await API.post(API_GENERATED, lessonDescriptor);
    return response.data;
};

// --- Auth & Roles ---

// GET http://localhost:8080/api/v1/roles
export const getRoles = async () => {
    const response = await API.get(API_ROLES);
    return response.data;
};

// POST http://localhost:8080/api/v1/auth/register
export const register = async (user) => {
    const response = await API.post(API_REGISTER, user);
    return response.data;
};

// POST http://localhost:8080/api/v1/auth/login
export const login = async (user) => {
    const response = await API.post(API_LOGIN, user);
    return response.data;
};

// --- Users ---

// GET http://localhost:8080/api/v1/users/role/{role}
export const getUsersByRole = async (role) => {
    const response = await API.get(`${API_USERS_BY_ROLE}/${role}`);
    return response.data;
};

export const getUsers = async (page, search) => {
    const response = await API.get(API_USERS, {
        params: {
            page: page,
            search: search
        }
    });
    return response.data;
};

// PUT http://localhost:8080/api/v1/users/status/{id}
export const updateUserStatus = async (id, user) => {
    const response = await API.put(`${API_USERS}/status/${id}`, user);
    return response.data;
};

// GET http://localhost:8080/api/v1/users/auth/me
export const getMe = async () => {
    const response = await API.get(API_ME);
    return response.data;
};

export const updateUserPassword = async (id, passwordData) => {
    const response = await API.put(`${API_USERS}/${id}/password`, passwordData);
    return response.data;
};

// --- Salaries & Financial Reports ---

// GET http://localhost:8080/api/v1/salaries/calculate?mentorId=...&start=...&end=...
export const calculateSalary = async ({mentorId, start, end}) => {
    const response = await API.get(`${API_SALARIES}/calculate`, {
        params: {mentorId, start, end}
    });
    return response.data;
};

// POST http://localhost:8080/api/v1/salaries/report?mentorId=...&start=...&end=...
export const saveSalaryReportApi = async ({mentorId, start, end}) => {
    const response = await API.post(`${API_SALARIES}/report`, null, {
        params: {mentorId, start, end}
    });
    return response.data;
};

// GET http://localhost:8080/api/v1/salaries/mentor/{mentorId}/reports
export const getMentorReportsApi = async (mentorId) => {
    const response = await API.get(`${API_SALARIES}/mentor/${mentorId}/reports`);
    return response.data;
};

// DELETE http://localhost:8080/api/v1/salaries/reports/{id}
export const deleteSalaryReportApi = async (reportId) => {
    const response = await API.delete(`${API_SALARIES}/reports/${reportId}`);
    return response.data;
};

export const downloadSalaryReportFile = async (reportId) => {
    try {
        const response = await API.get(`${BASE_URL}/salaries/reports/${reportId}/download`, {
            responseType: 'arraybuffer' // Переключаем на arraybuffer для идеальной совместимости с потоками байт
        });

        // Создаем Blob из буфера ответа
        const blob = new Blob([response.data], {type: 'application/pdf'});

        // Создаем безопасную ссылку для скачивания
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Salary_Report_${reportId}.pdf`;

        // Добавляем ссылку в DOM, кликаем и сразу удаляем
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Освобождаем память браузера
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Critical download error in API layer:", error);
        throw error; // Пробрасываем ошибку дальше в компонент UI
    }
};

// POST http://localhost:8080/api/v1/courses
export const createCourse = async (courseData) => {
    const response = await API.post(API_COURSES, courseData);
    return response.data;
};

// GET http://localhost:8080/api/v1/courses
export const getCourses = async () => {
    const response = await API.get(API_COURSES);
    return response.data;
};