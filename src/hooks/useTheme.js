import { useState } from "react";

const DARK_MODE_COLORS = {
  background: {
    // the name of the property is basically the Z index of the component
    // the higher the component is on the screen(z index), the higher background it uses
    primary: {
      0: "#040404",
      1: "#121212",
    },
    secondary: {
      0: "#ECECEC",
      1: "#B2B2B2",
    },
  },
  text: {
    primary: "#ECECEC",
    secondary: "#040404",
  },
  // The accent objects are same in both dark mode and light mode
  accent: {
    primary: "#03B591",
    secondary: "#5C5B66",
  },
};

const LIGHT_MODE_COLORS = {
  background: {
    // the name of the property is basically the Z index of the component
    // the higher the component is on the screen(z index), the higher background it uses
    primary: {
      0: "#ECECEC",
      1: "#B2B2B2",
    },
    secondary: {
      0: "#040404",
      1: "#121212",
    },
  },
  text: {
    primary: "#000",
    secondary: "#000",
  },
  // The accent objects are same in both dark mode and light mode
  accent: {
    primary: "#03B591",
    secondary: "#5C5B66",
  },
};

const COMMON = {
  white: "#FFFFFF",
  black: "#000000",
  orange: "#FFA500",
  red: "#E32636",
};

const useTheme = () => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  return isDarkModeActive
    ? { ...DARK_MODE_COLORS, common: COMMON, statusBarStyle: "light" }
    : { ...LIGHT_MODE_COLORS, common: COMMON, statusBarStyle: "dark" };
};

export default useTheme;
