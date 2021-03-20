import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View } from "react-native";
import * as names from "./names";
import DiscoverScreen from "../../screens/DiscoverScreen";
import useTheme from "../../hooks/useTheme";
import pxGenerator from "../../helpers/pxGenerator";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import MapScreen from "../../screens/MapScreen";
import LikedLocationsScreen from "../../screens/LikedLocationsScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import AddLocationRouter from "../AddLocationRouter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const ICON_SIZE = 26;

const MainRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);
  const isBottomTabBarVisible = useSelector(
    (state) => state.appState.isBottomTabBarVisible
  );

  const theme = useTheme();

  return (
    <Tab.Navigator
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
              return <Entypo name="home" size={ICON_SIZE} color={clr} />;
            case names.MAP_SCREEN:
              return (
                <Entypo name="location-pin" size={ICON_SIZE} color={clr} />
              );
            case names.ADD_LOCATION_SCREEN:
              return <AntDesign name="plus" size={ICON_SIZE} color={clr} />;
            case names.LIKED_LOCATIONS_SCREEN:
              return <Foundation name="heart" size={ICON_SIZE} color={clr} />;
            case names.SETTINGS_SCREEN:
              return isLoggedIn ? (
                // TODO: Use the persons avatar instead of this heart icon
                <Foundation name="heart" size={ICON_SIZE} color={clr} />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={ICON_SIZE}
                  color={clr}
                />
              );
            default:
              console.log("Error");
          }
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <View
              style={{
                height: 3,
                width: ICON_SIZE,
                borderRadius: pxGenerator(5),
                // If it's focused, give it a color, otherwise make it transparent
                backgroundColor: focused ? theme.accent.primary : "transparent",
                position: "relative",
                top: 0,
                left: 0,
                marginBottom: pxGenerator(2),
              }}
            ></View>
          );
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