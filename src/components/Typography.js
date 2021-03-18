import React from "react";
import { StyleSheet, Text } from "react-native";
import useTheme from "../hooks/useTheme";
import PropTypes from "prop-types";

export const REGULAR_FF = "Poppins_400Regular";
export const MEDIUM_FF = "Poppins_500Medium";
export const SEMI_BOLD_FF = "Poppins_600SemiBold";
export const BOLD_FF = "Poppins_700Bold";

const Typography = ({
  fontWeight = "medium",
  color = "primary",
  fontSize,
  variant,
  onPress,
  children,
  style,
}) => {
  const theme = useTheme();

  const getTextStyle = () => {
    const tmpStyle = [];

    switch (color) {
      case "primary":
        tmpStyle.push({ color: theme.text.primary });
        break;
      case "secondary":
        tmpStyle.push({ color: theme.text.secondary });
        break;
      case "accent":
        tmpStyle.push({ color: theme.accent.primary });
        break;
      case "accentSecondary":
        tmpStyle.push({ color: theme.accent.secondary });
        break;
      default:
        tmpStyle.push({ color: theme.text.primary });
    }

    // If one of the pre-defined variants are selected, create a style according to that
    if (variant) {
      switch (variant) {
        case "h1":
          tmpStyle.push(styles.bold);
          tmpStyle.push(styles.h1);
          break;
        case "h2":
          tmpStyle.push(styles.bold);
          tmpStyle.push(styles.h2);
          break;
        case "h3":
          tmpStyle.push(styles.semiBold);
          tmpStyle.push(styles.h3);
          break;
        case "h4":
          tmpStyle.push(styles.semiBold);
          tmpStyle.push(styles.h4);
          break;
        default:
          tmpStyle.push(styles.medium);
      }

      return tmpStyle;
    } else {
      // default font size if there is no variant set
      tmpStyle.push({ fontSize: 15 });
    }

    switch (fontWeight) {
      case "regular":
        tmpStyle.push(styles.regular);
        break;
      case "medium":
        tmpStyle.push(styles.medium);
        break;
      case "semi-bold":
        tmpStyle.push(styles.semiBold);
        break;
      case "bold":
        tmpStyle.push(styles.bold);
        break;
      default:
    }

    if (fontSize && typeof fontSize === "number") {
      tmpStyle.push({ fontSize });
    }

    return tmpStyle;
  };

  return (
    <Text style={[getTextStyle(), style]} onPress={onPress}>
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  regular: {
    fontFamily: REGULAR_FF,
  },
  medium: {
    fontFamily: MEDIUM_FF,
  },
  semiBold: {
    fontFamily: SEMI_BOLD_FF,
  },
  bold: {
    fontFamily: BOLD_FF,
  },
  h1: {
    fontSize: 28,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 21,
  },
  h4: {
    fontSize: 17,
  },
});

Typography.propTypes = {
  fontWeight: PropTypes.oneOf(["regular", "medium", "semi-bold", "bold"]),
  color: PropTypes.oneOf(["primary", "secondary", "accent"]),
  fontSize: PropTypes.number,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  style: Text.propTypes.style,
};
