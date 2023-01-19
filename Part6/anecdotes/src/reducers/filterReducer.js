import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSLice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setFilter } = filterSLice.actions;

export default filterSLice.reducer;
