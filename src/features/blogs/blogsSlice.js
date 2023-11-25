import { getBlogs } from "./blogsAPI";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (query) => {
    const blogs = await getBlogs(query);
    return blogs;
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    toggleSavedStatus: (state, action) => {
      const { blogId } = action.payload;
      const blogToUpdate = state.blogs.find((blog) => blog.id === blogId);
      if (blogToUpdate) {
        blogToUpdate.isSaved = !blogToUpdate.isSaved;
      }
    },
    filters: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.isSaved === true);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.blogs = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogsSlice.reducer;
export const { toggleSavedStatus, filters } = blogsSlice.actions;
