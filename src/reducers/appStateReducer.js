import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomTabBarVisible: true,
  bottomTabBarIconSize: 23,

  isCameraActive: false,
  safeAreaViewEdges: ["all"],
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
  },
});

export const {
  setIsBottomTabBarVisible,
  setIsCameraActive,
  setSafeAreaViewEdges,
  resetSafeAreaViewEdges,
} = appStateSlice.actions;

export default appStateSlice.reducer;
