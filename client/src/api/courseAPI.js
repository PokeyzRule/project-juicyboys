import axiosClient from "../utils/axiosClient";

// POST
export const insertCourse = (payload) => axiosClient.post(`/courses/create`, payload);
export const enrollCourse = (payload) => axiosClient.post(`/courses/enroll`, payload);
export const addAssignment = (payload) => axiosClient.post('/courses/createAssignment', payload)
export const addAssignmentFiles = (payload) => axiosClient.post(`/courses/updateAssignment`, payload)
export const addSubmission = (payload) => axiosClient.post('/courses/submitAssignment', payload)
export const addGrade = (payload) => axiosClient.post(`/courses/addGrade`, payload)

// GET
export const getAllCourses = () => axiosClient.get(`/courses`);
export const getSubmissionsByAssignment = (id) => axiosClient.get(`/courses/submissions/${id}`)
export const getCourseByID = (id) => axiosClient.get(`/courses/${id}`);
export const getCoursesByTeacher = (id) => axiosClient.get(`/courses/teacher/${id}`);

const courseAPI = {
    insertCourse,
    enrollCourse,
    addAssignment,
    addAssignmentFiles,
    addSubmission,
    addGrade,
    getAllCourses,
    getCourseByID,
    getSubmissionsByAssignment,
    getCoursesByTeacher
};

export default courseAPI;