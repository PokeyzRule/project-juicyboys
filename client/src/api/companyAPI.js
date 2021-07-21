import axiosClient from "../utils/axiosClient";

// GET
export const getCompanyByID = (id) => axiosClient.get(`/companies/${id}`);
export const createCompany = (payload) => axiosClient.post(`/companies/create`, payload)
export const addOwner = (payload) => axiosClient.post('/companies/addOwner', payload)
export const allCompanies = () => axiosClient.get('/companies/')

const companyAPI = {
    getCompanyByID,
    createCompany,
    addOwner,
    allCompanies
};

export default companyAPI;