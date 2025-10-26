/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {},
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },

    deleteFeed: () => {
      return null;
    },
  },
});

export const { setFeed, deleteFeed } = feedSlice.actions;
export default feedSlice.reducer;
