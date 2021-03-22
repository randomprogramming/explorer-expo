import { createSlice } from "@reduxjs/toolkit";

// this is the reducer which will keep track of the current location that the user wants to add
const initialState = {
  media: [],
  title: "",
  // These are the selected coordinates, if user is using 'Use current location' option, we ignore these
  selectedLatitude: undefined,
  selectedLongitude: undefined,
};

const addLocationSlice = createSlice({
  name: "addLocation",
  initialState,
  reducers: {
    appendMediaToState(state, action) {
      state.media.push(action.payload);
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setCoordinates(state, action) {
      const { latitude, longitude } = action.payload;

      if (
        latitude &&
        longitude &&
        typeof latitude === "number" &&
        typeof longitude === "number"
      ) {
        state.selectedLatitude = latitude;
        state.selectedLongitude = longitude;
      }
    },
  },
});

export const {
  appendMediaToState,
  setTitle,
  setCoordinates,
} = addLocationSlice.actions;

export default addLocationSlice.reducer;
