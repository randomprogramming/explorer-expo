import React from "react";
import { Pressable } from "react-native";
import Typography from "./Typography";

const Link = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress} hitSlop={6}>
      <Typography color="accent">{children}</Typography>
    </Pressable>
  );
};

export default Link;
