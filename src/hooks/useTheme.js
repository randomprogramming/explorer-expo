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
};

const LIGHT_MODE_COLORS = {
  background: {
    // the name of the property is basically the Z index of the component
    // the higher the component is on the screen(z index), the higher background it uses
    primary: {
      0: "#FFFFFF",
      1: "#F8F6F6",
    },
    secondary: {
      0: "#040404",
      1: "#121212",
    },
  },
  text: {
    primary: "#080808",
    secondary: "#F8F6F6",
  },
};

const COMMON = {
  white: "#FFFFFF",
  black: "#000000",
  orange: "#FFA500",
  red: "#E32636",
};

const ACCENT = {
  primary: "#0F9E80",
  secondary: "#7A8CA9",
};

const useTheme = () => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  return isDarkModeActive
    ? {
        ...DARK_MODE_COLORS,
        common: COMMON,
        accent: ACCENT,
        statusBarStyle: "light-content",
      }
    : {
        ...LIGHT_MODE_COLORS,
        common: COMMON,
        accent: ACCENT,
        statusBarStyle: "dark-content",
      };
};

export default useTheme;
