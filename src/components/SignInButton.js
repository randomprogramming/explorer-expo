import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import Typography from "./Typography";
import PropTypes from "prop-types";

const SignInButton = ({ onPress, disabled, style }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.main,
        { backgroundColor: theme.accent.primary },
        style,
        // If button is disabled, set some gray color on it
        disabled && { backgroundColor: theme.accent.secondary },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Typography fontWeight="semi-bold" color="secondary">
        Sign in
      </Typography>
    </TouchableOpacity>
  );
};

export default SignInButton;

SignInButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  style: TouchableOpacity.propTypes.style,
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: pxGenerator(4),
    paddingHorizontal: pxGenerator(8),
    alignItems: "center",
    borderRadius: pxGenerator(2),
    marginTop: pxGenerator(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignSelf: "flex-start",
  },
});
