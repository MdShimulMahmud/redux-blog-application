import axios from "../../utils/axios";

// GET /posts?_sort=views&_order=asc
// GET /posts/1/comments?_sort=votes&_order=asc

export const getBlogs = async (query) => {
  const respose = await axios.get(`/blogs?${query}`);

  return respose.data;
};

export const updateBlogInDatabase = async (blogId, isSaved) => {
  // Simulate updating the database (replace with actual API call)
  await axios.put(`/blogs/${blogId}`, { isSaved });
};
