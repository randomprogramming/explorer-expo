import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as names from "./names";
import LoginScreen from "../../screens/auth/LoginScreen";
import NoAuthScreen from "../../screens/NoAuthScreen";
import PropTypes from "prop-types";

const Stack = createStackNavigator();

const NoAuthRouter = ({ noAuthScreenTitle, noAuthScreenText }) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={names.NO_AUTH_SCREEN}
        component={NoAuthScreen}
        initialParams={{
          noAuthScreenTitle,
          noAuthScreenText,
          navigateTo: names.LOGIN_SCREEN,
        }}
      />
      <Stack.Screen name={names.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={names.REGISTER_SCREEN} component={LoginScreen} />
      {/* TODO: Add the actual register screen */}
    </Stack.Navigator>
  );
};

NoAuthRouter.propTypes = {
  noAuthScreenTitle: PropTypes.string.isRequired,
  noAuthScreenText: PropTypes.string.isRequired,
};

export default NoAuthRouter;
