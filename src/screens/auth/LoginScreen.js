import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import Typography from "../../components/Typography";
// import { REGISTER_SCREEN } from "../../routers/NoAuthRouter/names";
import styles from "./styles";
// import Link from "../../components/Link";
import BigButton from "../../components/BigButton";
import { ScrollView } from "react-native-gesture-handler";
// import Axios from "axios";
// import { LOGIN_URL } from "../../../apiLinks";
import { useDispatch, useSelector } from "react-redux";
// import { setToken } from "../../actions/tokenActions";
import useTheme from "../../hooks/useTheme";
import { handleLogin } from "../../actions/personActions";

const username = "username";
const password = "password";

const FIELD_MARGIN = 6;

const LoginScreen = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    [username]: "",
    [password]: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    statusCode: 0,
    message: "",
  });

  const isFetchingLoginData = useSelector(
    (state) => state.person.isFetchingLoginData
  );

  const dispatch = useDispatch();

  const theme = useTheme();

  const handleDataChange = (newValue, name) => {
    // newValue is the new value after data changed
    // name is the name of the field that we want to mutate
    setLoginData({ ...loginData, [name]: newValue });
  };

  const handleLoginPress = async () => {
    dispatch(handleLogin(loginData));
    // setIsLoggingIn(true);
    // Axios({
    //   method: "POST",
    //   url: LOGIN_URL,
    //   data: loginData,
    //   timeout: 7000, // If there was no response in 7 seconds, timeout the request
    // })
    //   .then((res) => {
    //     setServerResponse({
    //       statusCode: res.status,
    //       message: res.data.message,
    //     });
    //     // Save the token we got in the Keychain
    //     dispatch(setToken(res.data.token, true));
    //   })
    //   .catch((err) => {
    //     setServerResponse({
    //       statusCode: err && err.status,
    //       message:
    //         (err && err.response && err.response.data) ||
    //         "There was an error logging You in, please try again.",
    //     });
    //   })
    //   .finally(() => setIsLoggingIn(false));
  };

  return (
    <KeyboardAvoidingView
      style={[styles.main, { backgroundColor: theme.background.primary[0] }]}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <View style={styles.contentContainer}>
          {isFetchingLoginData ? (
            <Typography>Yes</Typography>
          ) : (
            <Typography>No</Typography>
          )}
          <Typography variant="h2">Let's get you signed in</Typography>
          <Typography>
            Sign in to get access to features such as adding your own locations,
            liking other peoples locations and many more!
          </Typography>
          <View style={styles.flexGrow}>
            <CustomTextInput
              placeholder="Email"
              keyboardType="email-address"
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

            {/* TODO: Style this according to the status code, make it green for 200 and red for 400 */}
            <Typography>{serverResponse.message}</Typography>
          </View>

          <View style={styles.linkContainer}>
            <Typography>Don't have an account yet? </Typography>
            {/* <Link onPress={() => navigation.navigate(REGISTER_SCREEN)}>
              Sign up here
            </Link> */}
          </View>

          <BigButton
            disabled={isLoggingIn}
            title="Sign In"
            onPress={handleLoginPress}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
