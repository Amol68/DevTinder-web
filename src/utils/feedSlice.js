/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },

    deleteFeed: () => {
      return [];
    },

    removeUser: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { setFeed, deleteFeed, removeUser } = feedSlice.actions;
export default feedSlice.reducer;
