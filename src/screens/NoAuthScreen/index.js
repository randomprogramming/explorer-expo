import React from "react";
import Container from "../../components/Container";
import SignInButton from "../../components/SignInButton";
import Typography from "../../components/Typography";

function NoAuthScreen({ navigation, route }) {
  return (
    <Container defaultPadding>
      <Typography variant="h1">{route.params.noAuthScreenTitle}</Typography>
      <Typography>{route.params.noAuthScreenText}</Typography>
      <SignInButton
        onPress={() => navigation.navigate(route.params.navigateTo)}
      />
    </Container>
  );
}

export default NoAuthScreen;
