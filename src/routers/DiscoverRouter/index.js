import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import * as names from "./names";
import DiscoverScreen from "../../screens/DiscoverScreen";
import SearchScreen from "../../screens/SearchScreen";

const Stack = createStackNavigator();

const DiscoverRouter = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={names.DISCOVER_MAIN_SCREEN}
    >
      <Stack.Screen
        name={names.DISCOVER_MAIN_SCREEN}
        component={DiscoverScreen}
      />
      <Stack.Screen name={names.SEARCH_SCREEN} component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default DiscoverRouter;
