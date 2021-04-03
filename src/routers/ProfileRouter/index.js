import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import LoginScreen from "../../screens/auth/LoginScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import SettingsScreen from "../../screens/MenuScreens/SettingsScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import NoAuthProfileScreen from "../../screens/ProfileScreen/NoAuthProfileScreen";
import * as names from "./names";

const Stack = createStackNavigator();

const ProfileScreenNoAuthRouter = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={names.PROFILE_SCREEN_NO_AUTH_MAIN_SCREEN}
    >
      <Stack.Screen
        name={names.PROFILE_SCREEN_NO_AUTH_MAIN_SCREEN}
        component={NoAuthProfileScreen}
      />
      <Stack.Screen
        name={names.PROFILE_SCREEN_SETTINGS_SCREEN}
        component={SettingsScreen}
      />
      <Stack.Screen
        name={names.PROFILE_SCREEN_LOGIN_SCREEN}
        component={LoginScreen}
        initialParams={{
          registerScreenName: names.PROFILE_SCREEN_REGISTER_SCREEN,
        }}
      />
      <Stack.Screen
        name={names.PROFILE_SCREEN_REGISTER_SCREEN}
        component={RegisterScreen}
        initialParams={{
          loginScreenName: names.PROFILE_SCREEN_LOGIN_SCREEN,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  return isLoggedIn ? <ProfileScreen /> : <ProfileScreenNoAuthRouter />;
};

export default ProfileRouter;
