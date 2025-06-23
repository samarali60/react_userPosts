import { APIClient } from ".";

export const createPostAPI = async (data) => {
  return await APIClient.post("/posts", data);
};

export const getPostsAPI = async () => {
  return await APIClient.get("/posts");
};
export const getSinglePostAPI = async (id) => {
  return await APIClient.get(`/posts/${id}`);
};
export const deletePostAPI = async (id) => {
  return await APIClient.delete(`/posts/${id}`);}

export const updatePostAPI = async (id, data) => {
  return await APIClient.put(`/posts/${id}`, data);
};
