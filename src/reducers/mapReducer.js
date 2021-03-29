import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],

  selectedLocation: {},
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      return { ...state, locations: action.payload };
    },
    setSelectedLocation: (state, action) => {
      const wantedLocationId = action.payload;

      if (typeof wantedLocationId === "string" && wantedLocationId.length > 0) {
        for (const location of state.locations) {
          if (location.id === wantedLocationId) {
            return { ...state, selectedLocation: location };
          }
        }
      }
    },
    wipeSelectedLocation: (state, action) => {
      state.selectedLocation = {};
    },
  },
});

export const {
  setLocations,
  setSelectedLocation,
  wipeSelectedLocation,
} = mapSlice.actions;

export default mapSlice.reducer;
