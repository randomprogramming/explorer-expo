import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import * as names from "./names";
import DiscoverScreen from "../../screens/DiscoverScreen";
import useTheme from "../../hooks/useTheme";
import { Foundation } from "@expo/vector-icons";
import MapScreen from "../../screens/MapScreen";
import LikedLocationsScreen from "../../screens/LikedLocationsScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import AddLocationRouter from "../AddLocationRouter";
import { useSelector } from "react-redux";
import CustomBottomTabBar from "../../components/CustomBottomTabBar";
import Icon from "../../components/Icon";

const Tab = createBottomTabNavigator();

const ICON_SIZE = 23;

const MainRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);
  const isBottomTabBarVisible = useSelector(
    (state) => state.appState.isBottomTabBarVisible
  );

  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      tabBarOptions={{
        tabStyle: {
          backgroundColor: theme.background.primary[0],
          paddingTop: 8,
        },
        keyboardHidesTabBar: Platform.OS === "android",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const clr = focused ? theme.accent.primary : theme.accent.secondary;

          switch (route.name) {
            case names.DISCOVER_SCREEN:
              return <Icon.Home size={ICON_SIZE} color={clr} />;
            case names.MAP_SCREEN:
              return (
                <Icon.Map name="location-pin" size={ICON_SIZE} color={clr} />
              );
            case names.ADD_LOCATION_SCREEN:
              return <Icon.Plus name="plus" size={ICON_SIZE} color={clr} />;
            case names.LIKED_LOCATIONS_SCREEN:
              return <Icon.Heart name="heart" size={ICON_SIZE} color={clr} />;
            case names.SETTINGS_SCREEN:
              return isLoggedIn ? (
                // TODO: Chance this with users actual picture
                <Foundation name="heart" size={ICON_SIZE} color={clr} />
              ) : (
                <Icon.Avatar name="account" size={ICON_SIZE} color={clr} />
              );
            default:
              console.log("Error");
          }
        },
      })}
    >
      <Tab.Screen name={names.DISCOVER_SCREEN} component={DiscoverScreen} />
      <Tab.Screen name={names.MAP_SCREEN} component={MapScreen} />
      <Tab.Screen
        name={names.ADD_LOCATION_SCREEN}
        component={AddLocationRouter}
        options={() => ({
          tabBarVisible: isBottomTabBarVisible,
        })}
      />
      <Tab.Screen
        name={names.LIKED_LOCATIONS_SCREEN}
        component={LikedLocationsScreen}
      />
      {/* TODO: Replace settings screen with account screen */}
      <Tab.Screen name={names.SETTINGS_SCREEN} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainRouter;
