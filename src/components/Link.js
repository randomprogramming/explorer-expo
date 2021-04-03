import React from "react";
import { Pressable, ViewPropTypes } from "react-native";
import Typography from "./Typography";
import PropTypes from "prop-types";

const Link = ({ onPress, children, style, useUnderline }) => {
  return (
    <Pressable onPress={onPress} hitSlop={6} style={style}>
      <Typography
        color="accent"
        style={useUnderline && { textDecorationLine: "underline" }}
      >
        {children}
      </Typography>
    </Pressable>
  );
};

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  useUnderline: PropTypes.bool,
};

export default Link;
