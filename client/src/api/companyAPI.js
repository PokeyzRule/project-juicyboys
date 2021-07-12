import axiosClient from "../utils/axiosClient";

// GET
export const getCompanyByID = (id) => axiosClient.get(`/companies/${id}`);

const companyAPI = {
    getCompanyByID
};

export default companyAPI;