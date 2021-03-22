import React from "react";
import Typography from "../../components/Typography";
import Container from "../../components/Container";
import BigButton from "../../components/BigButton";
import { ADD_LOCATION_SCREEN_MAIN } from "../../routers/AddLocationRouter/names";

const AddLocationInfoScreen = ({ navigation }) => {
  return (
    <Container defaultPadding headerTitle="Add Location">
      <Typography>
        Once you add a location, the images and exact position you add will be
        available for others to see and explore.
      </Typography>
      <BigButton
        title="Add Location"
        onPress={() => navigation.navigate(ADD_LOCATION_SCREEN_MAIN)}
        isSmall
      />
    </Container>
  );
};

export default AddLocationInfoScreen;
