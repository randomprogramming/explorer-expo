import React from "react";
import { View, TouchableOpacity } from "react-native";
import Container from "../../components/Container";
import SearchBar from "../../components/SearchBar";
import Typography from "../../components/Typography";
import Icon from "../../components/Icon";
import useTheme from "../../hooks/useTheme";
import styles from "./styles";
import { SEARCH_SCREEN } from "../../routers/DiscoverRouter/names";

const FAKE_SEARCHBAR_FONT_SIZE = 16;

const DiscoverScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    // TODO: Turn this into a scrollview
    <Container defaultPadding headerTitle="Discover">
      <Typography>
        Explore locations around you, or map out an exciting adventure!
      </Typography>
      <TouchableOpacity
        style={[
          styles.fakeSearchBar,
          { backgroundColor: theme.background.primary[1] },
        ]}
        onPress={() => navigation.navigate(SEARCH_SCREEN)}
      >
        <View style={styles.iconContainer}>
          <Icon
            name="search"
            size={FAKE_SEARCHBAR_FONT_SIZE}
            color={theme.accent.secondary}
          />
        </View>
        <Typography fontSize={FAKE_SEARCHBAR_FONT_SIZE} color="accentSecondary">
          Search for locations
        </Typography>
      </TouchableOpacity>
    </Container>
  );
};

export default DiscoverScreen;
