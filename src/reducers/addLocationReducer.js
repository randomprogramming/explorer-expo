import { createSlice } from "@reduxjs/toolkit";

// this is the reducer which will keep track of the current location that the user wants to add
const initialState = {
  media: [],
  title: "",
};

const addLocationSlice = createSlice({
  name: "addLocation",
  initialState,
  reducers: {},
});

export const {} = addLocationSlice.actions;

export default addLocationSlice.reducer;
