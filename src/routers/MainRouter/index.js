import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as names from "./names";
import DiscoverScreen from "../../screens/DiscoverScreen";
import useTheme from "../../hooks/useTheme";
import MapScreen from "../../screens/MapScreen";
import LikedLocationsScreen from "../../screens/LikedLocationsScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import AddLocationRouter from "../AddLocationRouter";
import { useSelector } from "react-redux";
import CustomBottomTabBar from "../../components/CustomBottomTabBar";
import Icon from "../../components/Icon";

const Tab = createBottomTabNavigator();

const MainRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);
  const profilePictureUrl = useSelector(
    (state) => state.person.profilePictureUrl
  );
  const iconSize = useSelector((state) => state.appState.bottomTabBarIconSize);

  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const clr = focused ? theme.accent.primary : theme.accent.secondary;

          switch (route.name) {
            case names.DISCOVER_SCREEN:
              return <Icon name="home" size={iconSize} color={clr} />;
            case names.MAP_SCREEN:
              return <Icon name="map" size={iconSize} color={clr} />;
            case names.ADD_LOCATION_SCREEN:
              return <Icon name="plus" size={iconSize} color={clr} />;
            case names.LIKED_LOCATIONS_SCREEN:
              return <Icon name="heart" size={iconSize} color={clr} />;
            case names.SETTINGS_SCREEN:
              return isLoggedIn && profilePictureUrl ? (
                // TODO: Change this with users actual picture
                <Image
                  source={{
                    uri: profilePictureUrl,
                  }}
                  style={{ height: iconSize, width: iconSize }}
                />
              ) : (
                <Icon name="heart" size={iconSize} color={clr} />
              );
            default:
              console.log(
                "Error when rendering BottomTabBar icons in MainRouter."
              );
          }
        },
      })}
    >
      <Tab.Screen name={names.DISCOVER_SCREEN} component={DiscoverScreen} />
      <Tab.Screen name={names.MAP_SCREEN} component={MapScreen} />
      <Tab.Screen
        name={names.ADD_LOCATION_SCREEN}
        component={AddLocationRouter}
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
