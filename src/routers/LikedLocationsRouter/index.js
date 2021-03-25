import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as names from "./names";
import LikedLocationsScreen from "../../screens/LikedLocationsScreen";
import NoAuthRouter from "../NoAuthRouter";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

function MainLikedLocationsRouter() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={names.LIKED_LOCATIONS_MAIN_SCREEN}
    >
      <Stack.Screen
        name={names.LIKED_LOCATIONS_MAIN_SCREEN}
        component={LikedLocationsScreen}
      />
    </Stack.Navigator>
  );
}

const LikedLocationsRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  return isLoggedIn ? (
    <MainLikedLocationsRouter />
  ) : (
    <NoAuthRouter
      noAuthScreenTitle="Liked Locations"
      noAuthScreenText="dsasadss"
    />
  );
};

export default LikedLocationsRouter;
