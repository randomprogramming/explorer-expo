import React from "react";
import BigButton from "../../components/BigButton";
import Container from "../../components/Container";
import Typography from "../../components/Typography";

function NoAuthScreen({ navigation, route }) {
  return (
    <Container defaultPadding headerTitle={route.params.noAuthScreenTitle}>
      <Typography>{route.params.noAuthScreenText}</Typography>
      <BigButton
        isSmall
        title="Sign In"
        onPress={() => navigation.navigate(route.params.navigateTo)}
      />
    </Container>
  );
}

export default NoAuthScreen;
