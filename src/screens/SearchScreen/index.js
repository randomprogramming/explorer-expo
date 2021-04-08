import React, { useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import SearchBar from "../../components/SearchBar";
import Typography from "../../components/Typography";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/Container";
import { fetchLocationsWithQuery } from "../../actions/locationSearchActions";
import { clearLocations } from "../../reducers/locationSearchReducer";
import { Location } from "../../components/LocationFlatList";

const SearchScreen = () => {
  const locations = useSelector((state) => state.locationSearch.locations);

  const dispatch = useDispatch();

  function handleSearchChange(newVal) {
    dispatch(fetchLocationsWithQuery(newVal));
  }

  useEffect(() => {
    return () => {
      dispatch(clearLocations());
    };
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: "padding" })}
      >
        <ScrollView style={styles.scrollView} stickyHeaderIndices={[1]}>
          <View style={[styles.paddingHorizontal, styles.topMargin]}>
            <Typography variant="h1">Search for locations</Typography>
          </View>
          <View style={[styles.paddingHorizontal, styles.paddingVertical]}>
            <SearchBar
              onChange={handleSearchChange}
              delayTimeout={700}
              minLength={3}
              placeholder="Hillside walk"
            />
          </View>
          {locations.map((item) => (
            <Location key={item.id} item={item} />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SearchScreen;
