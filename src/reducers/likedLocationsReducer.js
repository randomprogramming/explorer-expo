import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLocations: [],
  filteredLocations: [],

  searchValue: "",

  isFetchingData: false,
};

const likedLocationsSlice = createSlice({
  name: "likedLocations",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      const newValue = action.payload;
      if (typeof newValue === "string") {
        // mutate the search value and the filtered locations based on the search value
        // and return the new state
        return {
          ...state,
          searchValue: newValue,
          filteredLocations:
            newValue.length === 0
              ? state.allLocations
              : state.allLocations.filter((location) =>
                  location.title.toLowerCase().includes(newValue.toLowerCase())
                ),
        };
      }
    },
    setAllLocations: (state, action) => {
      // when we set all locations, we basically want to reset the entire state
      // also set the filtered locations to be the same as all locations in the beginning
      return {
        ...state,
        allLocations: action.payload,
        filteredLocations: action.payload,
        searchValue: "",
      };
    },
    setIsFetchingData: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.isFetchingData = action.payload;
      }
    },
  },
});

export const {
  setSearchValue,
  setAllLocations,
  setIsFetchingData,
} = likedLocationsSlice.actions;

export default likedLocationsSlice.reducer;
