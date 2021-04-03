import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomTabBarVisible: true,
  bottomTabBarIconSize: 23,

  isCameraActive: false,
  isMapOpen: false,
  safeAreaViewEdges: ["all"],

  isDarkModeActive: false,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsBottomTabBarVisible: (state, action) => {
      const newState = action.payload;

      if (typeof newState === "boolean") {
        state.isBottomTabBarVisible = newState;
      }
    },
    setIsCameraActive: (state, action) => {
      const newState = action.payload;

      if (typeof newState === "boolean") {
        state.isCameraActive = newState;
      }
    },
    setSafeAreaViewEdges: (state, action) => {
      state.safeAreaViewEdges = action.payload;
    },
    resetSafeAreaViewEdges: (state) => {
      state.safeAreaViewEdges = ["all"];
    },
    setIsDarkModeActive: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.isDarkModeActive = action.payload;
      }
    },
    setIsMapOpen: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.isMapOpen = action.payload;
      }
    },
  },
});

export const {
  setIsBottomTabBarVisible,
  setIsCameraActive,
  setSafeAreaViewEdges,
  resetSafeAreaViewEdges,
  setIsDarkModeActive,
  setIsMapOpen,
} = appStateSlice.actions;

export default appStateSlice.reducer;
