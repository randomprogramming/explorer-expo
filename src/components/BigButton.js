import React from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import Typography from "./Typography";
import PropTypes from "prop-types";

const BigButton = ({ onPress, title, disabled, style, isSmall }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.main,
        { backgroundColor: theme.accent.primary },
        style,
        isSmall && {
          alignSelf: "flex-start",
          paddingHorizontal: pxGenerator(8),
        },
        // If button is disabled, set some gray color on it
        disabled && { backgroundColor: theme.accent.secondary },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Typography fontWeight="semi-bold" color="secondary">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default BigButton;

BigButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
  isSmall: PropTypes.bool,
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: pxGenerator(4),
    alignItems: "center",
    borderRadius: pxGenerator(2.5),
    marginTop: pxGenerator(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  small: {
    alignSelf: "flex-start",
    paddingHorizontal: pxGenerator(8),
  },
});
