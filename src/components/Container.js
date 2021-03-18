import React from "react";
import { StyleSheet, View } from "react-native";
import useTheme from "../hooks/useTheme";
import { ViewPropTypes } from "react-native";

const Container = ({ children, style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: theme.background.primary[0] },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;

Container.propTypes = {
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
