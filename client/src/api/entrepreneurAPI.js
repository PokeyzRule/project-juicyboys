import axiosClient from "../utils/axiosClient";

// GET
export const getEntrepreneurByID = (id) => axiosClient.get(`/entrepreneurs/${id}`);
export const getEntrepreneurByEmail = (email) => axiosClient.get(`/entrepreneurs/email/${email}`)

const entrepreneurAPI = {
    getEntrepreneurByID,
    getEntrepreneurByEmail,
};

export default entrepreneurAPI;