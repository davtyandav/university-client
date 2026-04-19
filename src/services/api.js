import axios from 'axios';

// Твои переменные путей
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

// Твои переменные API
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

// --- ДОБАВЛЕННЫЙ ИНТЕРЦЕПТОР ---
// Мы создаем экземпляр API, чтобы прикреплять токен ко всем запросам автоматически
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

// Students
export const getStudents = async () => {
    const response = await API.get(API_STUDENTS);
    return response.data;
};

export const getStudentsByLessonDescriptor = async (lessonDescriptorId, lessonId) => {
    const response = await API.get(`${API_STUDENTS_LESSON_DESCRIPTOR}/${lessonDescriptorId}${LESSON}/${lessonId}`);
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await API.get(`${API_STUDENTS}/${id}`);
    return response.data;
};

export const createStudent = async (student) => {
    const response = await API.post(API_STUDENTS, student);
    return response.data;
};

export const updateStudent = async (id, student) => {
    const response = await API.put(`${API_STUDENTS}/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id) => {
    await API.delete(`${API_STUDENTS}/${id}`);
};

export const assignDescriptorToStudents = async (descriptorId, studentIds) => {
    // POST http://localhost:8080/api/v1/students/lessonDescriptor/123
    const response = await API.post(`${API_STUDENTS_LESSON_DESCRIPTOR}/${descriptorId}`, {
        studentIds: studentIds
    });
    return response.data;
};

// Mentors
export const updateMentor = async (id, mentor) => {
    const response = await API.put(`${API_MENTORS}/${id}`, mentor);
    return response.data;
};

export const deleteMentor = async (id) => {
    await API.delete(`${API_MENTORS}/${id}`);
};

export const getMentors = async () => {
    const response = await API.get(API_MENTORS);
    return response.data;
};

export const getMentorById = async (id) => {
    const response = await API.get(`${API_MENTORS}/${id}`);
    return response.data;
};

export const getLessonById = async (id) => {
    const response = await API.get(`${API_LESSON}/${id}`);
    return response.data;
};

export const createMentor = async (mentor) => {
    const response = await API.post(API_MENTORS, mentor);
    return response.data;
};

// Lesson Descriptor
export const getLessonDescriptor = async () => {
    const response = await API.get(API_LESSON_DESCRIPTOR);
    return response.data;
};

export const createLessonDescriptor = async (lessonDescriptor) => {
    const response = await API.post(API_LESSON_DESCRIPTOR, lessonDescriptor);
    return response.data;
};

export const generateMount = async (lessonDescriptor) => {
    const response = await API.post(API_GENERATED, lessonDescriptor);
    return response.data;
};

export const getRoles = async () => {
    const response = await API.get(API_ROLES);
    return response.data;
};

export const register = async (user) => {
    const response = await API.post(API_REGISTER, user);
    return response.data;
};

export const login = async (user) => {
    const response = await API.post(API_LOGIN, user);
    return response.data;
};

// Users
export const getUsersByRole = async (role) => {
    const response = await API.get(`${API_USERS_BY_ROLE}/${role}`);
    return response.data;
};

export const getUsers = async () => {
    const response = await API.get(API_USERS);
    return response.data;
};

// ИСПРАВЛЕНО: Убрали ID, так как бэкенд берет юзера из токена
export const getMe = async () => {
    const response = await API.get(API_ME);
    return response.data;
};