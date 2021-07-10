import axiosClient from "../utils/axiosClient";

// GET
export const getCompanyByID = (id) => axiosClient.get(`/company/${id}`);

const companyAPI = {
    getCompanyByID
};

export default companyAPI;