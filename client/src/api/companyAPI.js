import axiosClient from "../utils/axiosClient";

// GET
export const getCompanyByID = (id) => axiosClient.get(`/companies/${id}`);
export const createCompany = (payload) => axiosClient.post(`/companies/create`, payload)

const companyAPI = {
    getCompanyByID,
    createCompany
};

export default companyAPI;