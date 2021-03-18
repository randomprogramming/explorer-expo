import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import WelcomeScreen from "../../screens/WelcomeScreen";
// import RegisterScreen from "../../screens/RegisterScreen";
// import LoginScreen from "../../screens/LoginScreen";
import * as names from "./names";

const Stack = createStackNavigator();

const NoAuthRouter = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={names.WELCOME_SCREEN}>
      <Stack.Screen name={names.WELCOME_SCREEN} component={WelcomeScreen} />
      {/* <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} /> */}
      {/* <Stack.Screen name={SIGN_IN_SCREEN} component={LoginScreen} /> */}
    </Stack.Navigator>
  );
};

export default NoAuthRouter;
