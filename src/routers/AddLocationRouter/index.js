import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as names from "./names";
import AddLocationScreen from "../../screens/AddLocationScreen";
import Typography from "../../components/Typography";
import { useSelector } from "react-redux";
import Container from "../../components/Container";
import SignInButton from "../../components/SignInButton";

const Stack = createStackNavigator();

function NoAuthScreen({ navigation }) {
  return (
    <Container defaultPadding>
      <Typography variant="h1">Add Location</Typography>
      <Typography>
        We can't wait for you to add your own location for others to explore,
        but you will need to sign in to do that.
      </Typography>
      <SignInButton onPress={() => console.log("hello worlr")} />
    </Container>
  );
}

const AddLocationRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={
        // If user is logged in, show the main add location screen
        // otherwise, show the login screen
        isLoggedIn ? names.ADD_LOCATION_SCREEN_MAIN : names.NO_AUTH_SCREEN
      }
    >
      <Stack.Screen
        name={names.ADD_LOCATION_SCREEN_MAIN}
        component={AddLocationScreen}
      />
      <Stack.Screen name={names.NO_AUTH_SCREEN} component={NoAuthScreen} />
    </Stack.Navigator>
  );
};

export default AddLocationRouter;
