import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as names from "./names";
import AddLocationInfoScreen from "../../screens/AddLocationScreens/AddLocationInfoScreen";
import { useDispatch, useSelector } from "react-redux";
import NoAuthRouter from "../NoAuthRouter";
import { setOnLoginSuccess } from "../../reducers/personReducer";
import { DISCOVER_SCREEN } from "../MainRouter/names";
import AddLocationMainScreen from "../../screens/AddLocationScreens/AddLocationMainScreen";

const Stack = createStackNavigator();

function MainAddLocationRouter() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={names.ADD_LOCATION_INFO_SCREEN}
    >
      <Stack.Screen
        name={names.ADD_LOCATION_INFO_SCREEN}
        component={AddLocationInfoScreen}
      />
      <Stack.Screen
        name={names.ADD_LOCATION_SCREEN_MAIN}
        component={AddLocationMainScreen}
      />
    </Stack.Navigator>
  );
}

const AddLocationRouter = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    // When this component loads, set the on login success callback function, which..
    // naturally gets called when the login succeeds
    if (!isLoggedIn) {
      dispatch(setOnLoginSuccess(() => navigation.navigate(DISCOVER_SCREEN)));
    }
  }, []);

  return isLoggedIn ? (
    <MainAddLocationRouter />
  ) : (
    <NoAuthRouter
      noAuthScreenTitle="Add Location"
      noAuthScreenText="We can't wait for you to add your own location for others to explore,
      but you will need to sign in to do that."
    />
  );
};

export default AddLocationRouter;
