import React from "react";
import { StyleSheet, View } from "react-native";
import useTheme from "../hooks/useTheme";
import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import pxGenerator from "../helpers/pxGenerator";

const Container = ({ children, style, defaultPadding }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: theme.background.primary[0] },
        style,
        defaultPadding && styles.defaultPadding,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;

Container.propTypes = {
  style: ViewPropTypes.style,
  defaultPadding: PropTypes.bool,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  defaultPadding: {
    padding: pxGenerator(8),
  },
});
