import React from "react";
import { StyleSheet, View } from "react-native";
import useTheme from "../hooks/useTheme";
import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import pxGenerator from "../helpers/pxGenerator";
import Typography from "./Typography";

const Header = ({ title }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.header, { backgroundColor: theme.background.primary[0] }]}
    >
      <Typography variant="h1">{title}</Typography>
    </View>
  );
};

const Container = ({ children, style, defaultPadding, headerTitle }) => {
  const theme = useTheme();

  // If there was a header title provided, render the container with the header
  if (headerTitle && headerTitle.length > 0) {
    return (
      <View
        style={[
          styles.main,
          { backgroundColor: theme.background.primary[0] },
          style,
          defaultPadding && styles.defaultPaddingWithHeader,
        ]}
      >
        <Header title={headerTitle} />
        {children}
      </View>
    );
  }

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
  headerTitle: PropTypes.string,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  defaultPadding: {
    padding: pxGenerator(8),
  },
  defaultPaddingWithHeader: {
    paddingHorizontal: pxGenerator(8),
    paddingBottom: pxGenerator(8),
  },
  header: {
    paddingTop: pxGenerator(8),
  },
});
