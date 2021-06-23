import axiosClient from "../utils/axiosClient";

export const registerUser = (userData, dispatch) => {
    const headers = {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzAxZjk2ZTk1NmRkNzFiNGFhMmY3OSIsImlhdCI6MTYyMzIxMjA2OSwiZXhwIjoxNjIzMjE1NjY5fQ.NlSABKukS_GG8h4F4tVy263dxJGQt0AO1NNsbX6lbLs'
    }
    axiosClient
        .post("/auth/register", userData, headers)
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