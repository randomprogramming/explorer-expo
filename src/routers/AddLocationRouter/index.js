import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as names from "./names";
import AddLocationScreen from "../../screens/AddLocationScreen";
import { useDispatch, useSelector } from "react-redux";
import NoAuthRouter from "../NoAuthRouter";
import { setOnLoginSuccess } from "../../reducers/personReducer";
import { DISCOVER_SCREEN } from "../MainRouter/names";

const Stack = createStackNavigator();

function MainRouter() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={names.ADD_LOCATION_SCREEN_MAIN}
    >
      <Stack.Screen
        name={names.ADD_LOCATION_SCREEN_MAIN}
        component={AddLocationScreen}
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
    <MainRouter />
  ) : (
    <NoAuthRouter
      noAuthScreenTitle="Add Location"
      noAuthScreenText="We can't wait for you to add your own location for others to explore,
      but you will need to sign in to do that."
    />
  );
};

export default AddLocationRouter;
