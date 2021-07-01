import axiosClient from "../utils/axiosClient";

// GET
export const getPostsByCourseId = (id) => axiosClient.get(`/posts/course/${id}`);

// POST
export const addLike = (payload) => axiosClient.post('/posts/likes/add', payload);
export const removeLike = (payload) => axiosClient.post('/posts/likes/remove', payload);

const postAPI = {
    getPostsByCourseId,
    addLike,
    removeLike
};

export default postAPI;