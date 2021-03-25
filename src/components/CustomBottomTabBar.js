import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import useTheme from "../hooks/useTheme";
import posed from "react-native-pose";
import useIsKeyboardShown from "../hooks/useIsKeyboardShown";
import { useSelector } from "react-redux";

// TODO: Get better names for this, make a bit easier to understand and maybe make the slider
// slightly wider
const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 5;
const sliderWidth = tabWidth / 3;
const SpotLight = posed.View({
  route0: { x: tabWidth * 0 + sliderWidth },
  route1: { x: tabWidth * 1 + sliderWidth },
  route2: { x: tabWidth * 2 + sliderWidth },
  route3: { x: tabWidth * 3 + sliderWidth },
  route4: { x: tabWidth * 4 + sliderWidth },
});

const CustomBottomTabBar = ({ state, descriptors, navigation }) => {
  const { index: activeRouteIndex } = state;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const isBottomTabBarVisible = useSelector(
    (state) => state.appState.isBottomTabBarVisible
  );

  const theme = useTheme();

  const isKeyboardShown = useIsKeyboardShown();

  if (!isBottomTabBarVisible) {
    return null;
  }

  // If we are on android, and the keyboard is open, we need to hide the tab bar
  if (
    focusedOptions.tabBarVisible === false ||
    (Platform.OS == "android" && isKeyboardShown)
  ) {
    return null;
  }

  return (
    <View
      style={[styles.main, { borderTopColor: theme.background.primary[1] }]}
    >
      <View style={styles.spotlightContainer}>
        <SpotLight
          style={[styles.spotlight, { backgroundColor: theme.accent.primary }]}
          pose={`route${activeRouteIndex}`}
        />
      </View>

      {state.routes.map((route, index) => {
        let Icon = () => {};
        if (descriptors[route.key].options.tabBarIcon) {
          Icon = descriptors[route.key].options.tabBarIcon;
        }

        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.iconContainer}
            key={route.key}
          >
            <Icon focused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    height: 58,
    borderTopWidth: 1,
  },
  spotlightContainer: {
    position: "absolute",
    bottom: 6,
    left: 0,
  },
  spotlight: {
    width: sliderWidth,
    height: 3,
    borderRadius: 8,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 6,
  },
});
