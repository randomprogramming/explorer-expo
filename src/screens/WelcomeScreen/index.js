import React from "react";
import { View } from "react-native";
import BigButton from "../../components/BigButton";
import Typography from "../../components/Typography";
import styles from "./styles";
import {
  REGISTER_SCREEN,
  SIGN_IN_SCREEN,
} from "../../routers/NoAuthRouter/names";
import Container from "../../components/Container";

const WelcomeScreen = ({ navigation }) => {
  return (
    <Container style={styles.main}>
      <View style={styles.flex}>
        {/* TODO: Add an image or video here to introduce user to app */}
        <Typography variant="h1">Welcome to the Group Calendar App</Typography>
      </View>
      <View>
        <BigButton
          title="Sign In"
          onPress={() => navigation.navigate(SIGN_IN_SCREEN)}
        />
        <BigButton
          title="Register"
          onPress={() => navigation.navigate(REGISTER_SCREEN)}
        />
      </View>
    </Container>
  );
};
export default WelcomeScreen;
