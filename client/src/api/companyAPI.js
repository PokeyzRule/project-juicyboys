import axiosClient from "../utils/axiosClient";

// GET
export const getCompanyByID = (id) => axiosClient.get(`/companies/${id}`);
export const createCompany = (payload) => axiosClient.post(`/companies/create`, payload)
export const addOwner = (payload) => axiosClient.post('/companies/addOwner', payload)

const companyAPI = {
    getCompanyByID,
    createCompany,
    addOwner
};

export default companyAPI;