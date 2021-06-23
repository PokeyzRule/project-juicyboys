import axiosClient from "../utils/axiosClient";

// GET
export const getStudentByID = (id) => axiosClient.get(`/students/${id}`);

const studentAPI = {
    getStudentByID
};

export default studentAPI;