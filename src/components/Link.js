import React from "react";
import { Pressable } from "react-native";
import Typography from "./Typography";
import PropTypes from "prop-types";

const Link = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress} hitSlop={6}>
      <Typography color="accent">{children}</Typography>
    </Pressable>
  );
};

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Link;
