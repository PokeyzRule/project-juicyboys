import axiosClient from "../utils/axiosClient";

// GET
export const getTeacherByID = (id) => axiosClient.get(`/teacher/${id}`);

const teacherAPI = {
    getTeacherByID
};

export default teacherAPI;