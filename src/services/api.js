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
const SEARCH = '/search'

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

// GET http://localhost:8080/api/v1/users
export const getUsers = async () => {
    const response = await API.get(API_USERS);
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