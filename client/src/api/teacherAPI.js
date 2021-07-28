import axiosClient from "../utils/axiosClient";

// GET
export const getTeacherByID = (id) => axiosClient.get(`/teachers/${id}`);

const teacherAPI = {
    getTeacherByID
};

export default teacherAPI;