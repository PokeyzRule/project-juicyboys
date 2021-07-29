import axiosClient from "../utils/axiosClient";

// GET
export const getCompanyByID = (id) => axiosClient.get(`/companies/${id}`);
export const allCompanies = () => axiosClient.get('/companies/')

// POST
export const createCompany = (payload) => axiosClient.post(`/companies/create`, payload)
export const addOwner = (payload) => axiosClient.post('/companies/addOwner', payload)
export const addDocument = (payload) => axiosClient.post('/companies/addDocument', payload)
export const addFollower = (payload) => axiosClient.post('/companies/follow', payload)
export const removeFollower = (payload) => axiosClient.post('/companies/unfollow', payload)

const companyAPI = {
    getCompanyByID,
    allCompanies,
    createCompany,
    addOwner,
    addDocument,
    addFollower,
    removeFollower
};

export default companyAPI;