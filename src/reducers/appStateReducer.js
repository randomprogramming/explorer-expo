import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomTabBarVisible: true,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsBottomTabBarVisible(state, action) {
      const newState = action.payload;

      if (typeof newState == "boolean") {
        state.isBottomTabBarVisible = newState;
      }
    },
  },
});

export const { setIsBottomTabBarVisible } = appStateSlice.actions;

export default appStateSlice.reducer;
