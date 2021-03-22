import { createSlice } from "@reduxjs/toolkit";

// this is the reducer which will keep track of the current location that the user wants to add
const initialState = {
  media: [],
  title: "",
};

const addLocationSlice = createSlice({
  name: "addLocation",
  initialState,
  reducers: {
    appendMediaToState(state, action) {
      state.media.push(action.payload);
    },
  },
});

export const { appendMediaToState } = addLocationSlice.actions;

export default addLocationSlice.reducer;
