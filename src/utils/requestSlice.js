import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Requests",
  initialState: {},
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: () => {
      return null;
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
