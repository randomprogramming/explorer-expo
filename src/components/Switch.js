import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity,
} from "react-native";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import Typography from "./Typography";
import PropTypes from "prop-types";

// components prop should look like this
// const components = [
//   {
//     key: "firstkey",
//     text: "First one",
//   },
//   {
//     key: "secondkey",
//     text: "Second one",
//   },
// ];

const Switch = ({
  style,
  onChange,
  components,
  leftButtonIsDisabled,
  rightButtonIsDisabled,
}) => {
  const theme = useTheme();
  const [activeKey, setActiveKey] = useState();

  function handleClick(newActiveKey) {
    setActiveKey(newActiveKey);
    if (onChange) {
      onChange(newActiveKey);
    }
  }

  function getTextColor(key, isDisabled) {
    if (isDisabled) {
      return theme.accent.secondary;
    } else if (activeKey === key) {
      return theme.common.white;
    } else {
      return "primary";
    }
  }

  useEffect(() => {
    // When the component mounts, 'simulate' a click on the first component, so that the
    // outer component which uses the onChange callback is in sync
    handleClick(components[0].key);
  }, []);

  return (
    <View style={[styles.main, { borderColor: theme.accent.primary }, style]}>
      <TouchableOpacity
        disabled={leftButtonIsDisabled}
        onPress={() => handleClick(components[0].key)}
        style={[
          styles.flex,
          activeKey === components[0].key && {
            backgroundColor: theme.accent.primary,
          },
        ]}
      >
        <Typography
          fontSize={14}
          color={getTextColor(components[0].key, leftButtonIsDisabled)}
        >
          {components[0].text}
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={rightButtonIsDisabled}
        onPress={() => handleClick(components[1].key)}
        style={[
          styles.flex,
          activeKey === components[1].key && {
            backgroundColor: theme.accent.primary,
          },
        ]}
      >
        <Typography
          fontSize={14}
          color={getTextColor(components[1].key, rightButtonIsDisabled)}
        >
          {components[1].text}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default Switch;

Switch.propTypes = {
  style: ViewPropTypes.style,
  onChange: PropTypes.func,
  components: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  main: {
    borderRadius: pxGenerator(1),
    borderWidth: 1,
    flexDirection: "row",
  },
  flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: pxGenerator(1.5),
  },
});
