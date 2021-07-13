import axiosClient from "../utils/axiosClient";

// GET
export const getEntrepreneurByID = (id) => axiosClient.get(`/entrepreneurs/${id}`);

const entrepreneurAPI = {
    getEntrepreneurByID
};

export default entrepreneurAPI;