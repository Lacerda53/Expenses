import { createSlice } from "@reduxjs/toolkit";

const Render = createSlice({
  name: "Render",
  initialState: {
    isRender: false
  },
  reducers: {
    setIsRender(state, action) {
      state.isRender = action.payload;
    },
  },
});

export const { setIsRender} = Render.actions;

export default Render.reducer