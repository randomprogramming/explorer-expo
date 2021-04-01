import React, { useEffect } from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import PropTypes from "prop-types";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity
);

const AnimatedIcon = ({ size, onPress, isLocationLiked }) => {
  const fillAnim = React.useRef(new Animated.Value(0)).current;

  const theme = useTheme();

  let fillInterpolated = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", theme.accent.primary],
  });

  let elevationInterpolated = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 1],
  });

  let shadowInterpolated = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [3.84, 1.0],
  });

  useEffect(() => {
    if (isLocationLiked) {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fillAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [isLocationLiked]);

  return (
    <AnimatedTouchableOpacity
      onPressIn={onPress}
      style={[
        styles.main,
        {
          backgroundColor: theme.background.primary[0],
          elevation: elevationInterpolated,
          shadowRadius: shadowInterpolated,
        },
      ]}
    >
      <Svg width={size} height={size} viewBox="-20 -15 432.837 321.8574">
        <AnimatedPath
          d="M285.757.503a107.103 107.103 0 01106.58 106.58c0 107.624-195.918 214.204-195.918 214.204S.5 213.14.5 107.083A106.58 106.58 0 01107.08.503h0a105.534 105.534 0 0189.339 48.065A106.578 106.578 0 01285.757.503z"
          fill={fillInterpolated}
          stroke={theme.background.secondary[0]}
          strokeWidth={20}
        />
      </Svg>
    </AnimatedTouchableOpacity>
  );
};

export default AnimatedIcon;

AnimatedIcon.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  isLocationLiked: PropTypes.bool,
};

const styles = StyleSheet.create({
  main: {
    padding: pxGenerator(3),
    borderRadius: pxGenerator(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
  },
});
