import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as names from "./names";
import AddLocationScreen from "../../screens/AddLocationScreen";
import Typography from "../../components/Typography";
import { useSelector } from "react-redux";
import Container from "../../components/Container";
import SignInButton from "../../components/SignInButton";
import NoAuthRouter from "../NoAuthRouter";

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

const AddLocationRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

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
