import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "Connections",
  initialState: {},
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    }
  },
});

export const { addConnections, removeConnections, removeUser } =
  connectionSlice.actions;
export default connectionSlice.reducer;
