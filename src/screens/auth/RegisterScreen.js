import React from "react";
import { View } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import Typography from "../../components/Typography";
import { LOGIN_SCREEN } from "../../routers/NoAuthRouter/names";
import styles from "./styles";
import Link from "../../components/Link";
import BigButton from "../../components/BigButton";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setPassword,
  setRepeatedPassword,
  setUsername,
} from "../../reducers/registrationDataReducer";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import { handleRegister } from "../../actions/registrationDataActions";

const usernameField = "username";
const emailField = "email";
const passwordField = "password";
const repeatedPasswordField = "repeatedPassword";

const FIELD_MARGIN = 5;

const RegisterScreen = ({ navigation, route }) => {
  const username = useSelector((state) => state.registrationData.username);
  const email = useSelector((state) => state.registrationData.email);
  const password = useSelector((state) => state.registrationData.password);
  const repeatedPassword = useSelector(
    (state) => state.registrationData.repeatedPassword
  );
  const isCreatingAccount = useSelector(
    (state) => state.registrationData.isCreatingAccount
  );
  const statusCode = useSelector((state) => state.registrationData.statusCode);
  const statusText = useSelector((state) => state.registrationData.statusText);

  const dispatch = useDispatch();

  const handleDataChange = (newValue, name) => {
    switch (name) {
      case usernameField:
        dispatch(setUsername(newValue));
        break;
      case emailField:
        dispatch(setEmail(newValue));
        break;
      case passwordField:
        dispatch(setPassword(newValue));
        break;
      case repeatedPasswordField:
        dispatch(setRepeatedPassword(newValue));
        break;
    }
  };

  const handleRegisterPress = () => {
    dispatch(handleRegister());
  };

  function shouldDisableRegisterButton() {
    return (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      repeatedPassword.length === 0
    );
  }

  function getLoginScreenName() {
    if (route && route.params && route.params.loginScreenName)
      return route.params.loginScreenName;
    else return LOGIN_SCREEN;
  }

  return (
    <ScrollViewContainer
      useKeyboardAvoidView
      defaultPadding
      headerTitle="Create a new account"
    >
      <View style={styles.contentContainer}>
        <Typography>
          You will need an account to connect with Your colleagues or classmates
          and share calendars.
        </Typography>
        <View style={styles.flexGrow}>
          <CustomTextInput
            placeholder="Username"
            value={username}
            onChange={(newValue) => handleDataChange(newValue, usernameField)}
            marginTop={FIELD_MARGIN}
          />
          <CustomTextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChange={(newValue) => handleDataChange(newValue, emailField)}
            marginTop={FIELD_MARGIN}
          />
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChange={(newValue) => handleDataChange(newValue, passwordField)}
            marginTop={FIELD_MARGIN}
          />
          <CustomTextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={repeatedPassword}
            onChange={(newValue) =>
              handleDataChange(newValue, repeatedPasswordField)
            }
            marginTop={FIELD_MARGIN}
          />

          {/*
            This is the message that the server responds to
            TODO: Style this according to the status code, make it green for 200 and red for 400
            */}
          <Typography>{statusText}</Typography>
        </View>

        <View style={styles.linkContainer}>
          <Typography>Already have an account? </Typography>
          <Link onPress={() => navigation.navigate(getLoginScreenName())}>
            Log in here
          </Link>
        </View>

        <BigButton
          disabled={isCreatingAccount || shouldDisableRegisterButton()}
          title="Create Account"
          onPress={handleRegisterPress}
        />
      </View>
    </ScrollViewContainer>
  );
};

export default RegisterScreen;
