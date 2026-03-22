import axios from 'axios';

const STUDENTS = '/students';
const MENTORS = '/mentors';
const GENERATED = '/generate';
const LESSON_DESCRIPTOR = '/lessonDescriptor';
const LESSON = '/lesson';
const LESSONS = '/lessons';
const BASE_URL = 'http://localhost:8080/api/v1'

const API_STUDENTS = BASE_URL + STUDENTS;
const API_MENTORS = BASE_URL + MENTORS;
const API_LESSON = BASE_URL + LESSON;
const API_LESSON_DESCRIPTOR = BASE_URL + LESSON_DESCRIPTOR;
const API_GENERATED = BASE_URL + LESSONS + GENERATED;
const API_STUDENTS_LESSON_DESCRIPTOR = API_STUDENTS + LESSON_DESCRIPTOR;

// Students
export const getStudents = async () => {
    const response = await axios.get(API_STUDENTS);
    return response.data;
};

export const getStudentsByLessonDescriptor = async (lessonDescriptorId, lessonId) => {
    const response = await axios.get(`${API_STUDENTS_LESSON_DESCRIPTOR}/${lessonDescriptorId}${LESSON}/${lessonId}`);
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await axios.get(`${API_STUDENTS}/${id}`);
    return response.data;
};

export const createStudent = async (student) => {
    const response = await axios.post(API_STUDENTS, student);
    return response.data;
};

export const updateStudent = async (id, student) => {
    const response = await axios.put(`${API_STUDENTS}/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id) => {
    await axios.delete(`${API_STUDENTS}/${id}`);
};

// Mentors
export const updateMentor = async (id, mentor) => {
    const response = await axios.put(`${API_MENTORS}/${id}`, mentor);
    return response.data;
};

export const deleteMentor = async (id) => {
    await axios.delete(`${API_MENTORS}/${id}`);
};

export const getMentors = async () => {
    const response = await axios.get(API_MENTORS);
    return response.data;
};

export const getMentorById = async (id) => {
    const response = await axios.get(`${API_MENTORS}/${id}`);
    return response.data;
};

export const getLessonById = async (id) => {
    const response = await axios.get(`${API_LESSON}/${id}`);
    return response.data;
};

export const createMentor = async (mentor) => {
    const response = await axios.post(API_MENTORS, mentor);
    return response.data;
};

// Lesson Descriptor
export const getLessonDescriptor = async () => {
    const response = await axios.get(API_LESSON_DESCRIPTOR);
    return response.data;
};

export const createLessonDescriptor = async (lessonDescriptor) => {
    const response = await axios.post(API_LESSON_DESCRIPTOR, lessonDescriptor);
    return response.data;
};

export const generateMount = async (lessonDescriptor) => {
    const response = await axios.post(API_GENERATED, lessonDescriptor);
    return response.data;
};
