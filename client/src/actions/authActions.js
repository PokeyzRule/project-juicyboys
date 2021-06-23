import axiosClient from "../utils/axiosClient";

export const registerUser = (userData, dispatch) => {
    axiosClient
        .post("/auth/register", userData)
        .then(res => {
            dispatch({
                type: "LOGIN",
                payload: res.data
        })}) 
        .catch(err =>
            console.log(err)
        );
};

export const loginUser = (userData, dispatch) => {
    axiosClient
        .post("/auth/login", userData)
        .then(res => {
            dispatch({
                type: "LOGIN",
                payload: res.data
        })}) 
        .catch(err =>
            console.log(err)
        );
};