import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as names from "./names";
import useTheme from "../../hooks/useTheme";
import MapScreen from "../../screens/MapScreen";
import AddLocationRouter from "../AddLocationRouter";
import { useSelector } from "react-redux";
import CustomBottomTabBar from "../../components/CustomBottomTabBar";
import Icon from "../../components/Icon";
import LikedLocationsRouter from "../LikedLocationsRouter";
import DiscoverRouter from "../DiscoverRouter";
import ProfileRouter from "../ProfileRouter";

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
        tabBarIcon: ({ focused }) => {
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
            case names.PROFILE_SCREEN:
              return isLoggedIn && profilePictureUrl ? (
                <Image
                  source={{
                    uri: profilePictureUrl,
                  }}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    borderRadius: iconSize,
                    borderColor: clr,
                    borderWidth: 1,
                  }}
                />
              ) : (
                <Icon name="avatar" size={iconSize} color={clr} />
              );
            default:
              console.log(
                "Error when rendering BottomTabBar icons in MainRouter."
              );
          }
        },
      })}
    >
      <Tab.Screen name={names.DISCOVER_SCREEN} component={DiscoverRouter} />
      <Tab.Screen name={names.MAP_SCREEN} component={MapScreen} />
      <Tab.Screen
        name={names.ADD_LOCATION_SCREEN}
        component={AddLocationRouter}
      />
      <Tab.Screen
        name={names.LIKED_LOCATIONS_SCREEN}
        component={LikedLocationsRouter}
      />
      <Tab.Screen name={names.PROFILE_SCREEN} component={ProfileRouter} />
    </Tab.Navigator>
  );
};

export default MainRouter;
