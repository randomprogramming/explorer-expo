import { createSlice } from "@reduxjs/toolkit";

// this is the reducer which will keep track of the current location that the user wants to add
const initialState = {
  media: [],
  title: "",
  description: "",
  // These are the selected coordinates, if user is using 'Use current location' option, we ignore these
  selectedLatitude: undefined,
  selectedLongitude: undefined,
  isUploadingLocation: false,
};

const addLocationSlice = createSlice({
  name: "addLocation",
  initialState,
  reducers: {
    wipeState: () => initialState,
    appendMediaToState: (state, action) => {
      state.media.push(action.payload);
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCoordinates: (state, action) => {
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
    setIsUploadingLocation: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.isUploadingLocation = action.payload;
      }
    },
  },
});

export const {
  appendMediaToState,
  setTitle,
  setDescription,
  setCoordinates,
  wipeState,
  setIsUploadingLocation,
} = addLocationSlice.actions;

export default addLocationSlice.reducer;
