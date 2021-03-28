import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      return { locations: action.payload };
    },
  },
});

export const { setLocations } = mapSlice.actions;

export default mapSlice.reducer;
