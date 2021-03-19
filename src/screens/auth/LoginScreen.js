import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import Typography from "../../components/Typography";
import styles from "./styles";
import Link from "../../components/Link";
import BigButton from "../../components/BigButton";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import { handleLogin } from "../../actions/personActions";
import { REGISTER_SCREEN } from "../../routers/NoAuthRouter/names";

const username = "username";
const password = "password";

const FIELD_MARGIN = 6;

const LoginScreen = ({ navigation }) => {
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

  const theme = useTheme();

  const handleDataChange = (newValue, name) => {
    // newValue is the new value after data changed
    // name is the name of the field that we want to mutate
    setLoginData({ ...loginData, [name]: newValue });
  };

  const handleLoginPress = async () => {
    dispatch(handleLogin(loginData));
  };

  return (
    // TODO: Replace with scrollviewcontainer component
    <KeyboardAvoidingView
      style={[styles.main, { backgroundColor: theme.background.primary[0] }]}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <View style={styles.contentContainer}>
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
            <Link onPress={() => navigation.navigate(REGISTER_SCREEN)}>
              Sign up here
            </Link>
          </View>

          <BigButton
            disabled={isFetchingLoginData}
            title="Sign In"
            onPress={handleLoginPress}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
