import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomTabBarVisible: true,
  bottomTabBarIconSize: 23,
  isCameraActive: false,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsBottomTabBarVisible(state, action) {
      const newState = action.payload;

      if (typeof newState === "boolean") {
        state.isBottomTabBarVisible = newState;
      }
    },
    setIsCameraActive(state, action) {
      const newState = action.payload;

      if (typeof newState === "boolean") {
        state.isCameraActive = newState;
      }
    },
  },
});

export const {
  setIsBottomTabBarVisible,
  setIsCameraActive,
} = appStateSlice.actions;

export default appStateSlice.reducer;
