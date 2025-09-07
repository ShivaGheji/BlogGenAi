import api from "./apiClient";

export const generateBlog = async (payload) => {
  const res = await api.post("/blogs/generate", payload);
  return res.data;
};

export const listBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

export const getBlog = async (id) => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};
