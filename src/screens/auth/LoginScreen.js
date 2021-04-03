import React, { useState } from "react";
import { View } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import Typography from "../../components/Typography";
import styles from "./styles";
import Link from "../../components/Link";
import BigButton from "../../components/BigButton";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../actions/personActions";
import { REGISTER_SCREEN } from "../../routers/NoAuthRouter/names";
import ScrollViewContainer from "../../components/ScrollViewContainer";

const username = "username";
const password = "password";

const FIELD_MARGIN = 6;

const LoginScreen = ({ navigation, route }) => {
  // TODO: Put this in redux state
  const [loginData, setLoginData] = useState({
    [username]: "",
    [password]: "",
  });
  const [serverResponse, setServerResponse] = useState({
    statusCode: 0,
    message: "",
  });

  const isFetchingLoginData = useSelector(
    (state) => state.person.isFetchingLoginData
  );

  const dispatch = useDispatch();

  const handleDataChange = (newValue, name) => {
    // newValue is the new value after data changed
    // name is the name of the field that we want to mutate
    setLoginData({ ...loginData, [name]: newValue });
  };

  const handleLoginPress = () => {
    dispatch(handleLogin(loginData));
  };

  function shouldDisableLoginButton() {
    return loginData.username.length === 0 || loginData.password.length === 0;
  }

  function getRegisterScreenName() {
    if (route && route.params && route.params.registerScreenName)
      return route.params.registerScreenName;
    else return REGISTER_SCREEN;
  }

  return (
    <ScrollViewContainer
      defaultPadding
      useKeyboardAvoidView
      headerTitle="Let's get you signed in"
    >
      <Typography>
        Sign in to get access to features such as adding your own locations,
        liking other peoples locations and many more!
      </Typography>
      <View style={styles.flexGrow}>
        <CustomTextInput
          placeholder="Username"
          autoCapitalize="none"
          value={loginData.email}
          onChange={(newValue) => handleDataChange(newValue, username)}
          marginTop={FIELD_MARGIN}
        />
        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          value={loginData.password}
          onChange={(newValue) => handleDataChange(newValue, password)}
          marginTop={FIELD_MARGIN}
        />
        {/* TODO: Add a message when credentials are wrong */}
        {/* TODO: Style this according to the status code, make it green for 200 and red for 400 */}
        <Typography>{serverResponse.message}</Typography>
      </View>

      <View style={styles.linkContainer}>
        <Typography>Don't have an account yet? </Typography>
        <Link onPress={() => navigation.navigate(getRegisterScreenName())}>
          Sign up here
        </Link>
      </View>

      <BigButton
        disabled={isFetchingLoginData || shouldDisableLoginButton()}
        title="Sign In"
        onPress={handleLoginPress}
      />
    </ScrollViewContainer>
  );
};

export default LoginScreen;
