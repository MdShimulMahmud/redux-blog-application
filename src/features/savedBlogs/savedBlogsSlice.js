const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  savedBlogs: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    saveSelected: (state, action) => {
      state.savedBlogs = state.savedBlogs.map((blog) => {});
    },
  },
});

export default savedSlice.reducer;
export const { saveSelected } = savedSlice.actions;
