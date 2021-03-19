import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ViewPropTypes,
  Platform,
} from "react-native";
import useTheme from "../hooks/useTheme";
import PropTypes from "prop-types";
import Container from "./Container";

const ScrollViewContainer = ({
  children,
  style,
  refreshControl,
  useKeyboardAvoidView,
  keyboardAvoidViewBehavior,
  defaultPadding,
}) => {
  const theme = useTheme();

  const getBehavior = () => {
    if (keyboardAvoidViewBehavior) return keyboardAvoidViewBehavior;
    else if (Platform.OS === "ios") return "padding";
    else if (Platform.OS === "android") return "height";
  };

  return useKeyboardAvoidView ? (
    <KeyboardAvoidingView
      style={[
        styles.main,
        { backgroundColor: theme.background.primary[0] },
        style,
      ]}
      behavior={getBehavior()}
    >
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <Container defaultPadding={defaultPadding}>{children}</Container>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <ScrollView
      style={[
        styles.main,
        { backgroundColor: theme.background.primary[0] },
        style,
      ]}
      refreshControl={refreshControl}
    >
      <Container defaultPadding={defaultPadding}>{children}</Container>
    </ScrollView>
  );
};

export default ScrollViewContainer;

ScrollViewContainer.propTypes = {
  style: ViewPropTypes.style,
  useKeyboardAvoidView: PropTypes.bool,
  keyboardAvoidViewBehavior: PropTypes.oneOf(["padding", "height", "position"]),
  refreshControl: PropTypes.node,
  defaultPadding: PropTypes.bool,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
});
