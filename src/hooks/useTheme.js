import { useState } from "react";
import { useSelector } from "react-redux";

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
  black: "#080808",
  orange: "#FFA500",
  red: "#E32636",
};

const ACCENT_BASE = {
  primary: "#0F9E80",
  secondary: "#7A8CA9",
};

//TODO: Figure out a way to only have one global instance of usetheme instead of
//creating a new object in every component
const useTheme = () => {
  const isDarkModeActive = useSelector(
    (state) => state.appState.isDarkModeActive
  );

  const [darkModeColors, setDarkModeColors] = useState(DARK_MODE_COLORS);

  const [lightModeColors, setLightModeColors] = useState(LIGHT_MODE_COLORS);

  const ACCENT = {
    ...ACCENT_BASE,
    secondaryShades: {
      0: ACCENT_BASE.secondary + "AA",
      1: ACCENT_BASE.secondary + "55",
    },
  };

  return isDarkModeActive
    ? {
        ...darkModeColors,
        common: COMMON,
        accent: ACCENT,
        statusBarStyle: "light-content",
      }
    : {
        ...lightModeColors,
        common: COMMON,
        accent: ACCENT,
        statusBarStyle: "dark-content",
      };
};

export default useTheme;
