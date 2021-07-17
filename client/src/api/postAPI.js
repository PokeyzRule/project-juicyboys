import axiosClient from "../utils/axiosClient";

// GET
export const getPostsByCourseId = (id) => axiosClient.get(`/posts/course/${id}`);
export const getPostsByCompanyId = (id) => axiosClient.get(`/posts/company/${id}`);
export const getCommentsByPostId = (id) => axiosClient.get(`/posts/comments/${id}`);

// POST
export const addLike = (payload) => axiosClient.post('/posts/likes/add', payload);
export const removeLike = (payload) => axiosClient.post('/posts/likes/remove', payload);
export const addComment = (payload) => axiosClient.post('/posts/comments/create', payload);
export const addPost = (payload) => axiosClient.post('/posts/create', payload);

// DELETE
export const deletePost = (id) => axiosClient.delete(`/posts/${id}`)
export const deleteCommentById = (id) => axiosClient.delete(`/posts/comments/${id}`)

const postAPI = {
    getPostsByCourseId,
    getPostsByCompanyId,
    getCommentsByPostId,
    addLike,
    removeLike,
    addComment,
    addPost,
    deletePost,
    deleteCommentById
};

export default postAPI;