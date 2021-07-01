import axiosClient from "../utils/axiosClient";

// POST
export const insertCourse = (payload) => axiosClient.post(`/courses/create`, payload);
export const enrollCourse = (payload) => axiosClient.post(`/courses/enroll`, payload);

// GET
export const getAllCourses = () => axiosClient.get(`/courses`);
export const getCourseByID = (id) => axiosClient.get(`/courses/${id}`);

const courseAPI = {
    insertCourse,
    enrollCourse,
    getAllCourses,
    getCourseByID,
};

export default courseAPI;