import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
  RefreshControl,
  Platform,
} from "react-native";
// import styles from "./styles";
import Typography from "../../components/Typography";
import Container from "../../components/Container";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import pxGenerator from "../../helpers/pxGenerator";
import SearchBar from "../../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../reducers/likedLocationsReducer";
import { getLikedLocations } from "../../actions/likedLocationsActions";
import useTheme from "../../hooks/useTheme";

const HEADER_MAX_HEIGHT = 140;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 99,
    paddingHorizontal: pxGenerator(8),
  },
  bar: {
    marginTop: pxGenerator(4),
    position: "relative",
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    marginVertical: 16,
    height: 300,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 5,
  },
});

const Item = ({ index, item }) => {
  const { title, media } = item;

  return (
    <View>
      <View style={styles.row}>
        <Typography>{title}</Typography>
      </View>
    </View>
  );
};

const LikedLocationsScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const searchValue = useSelector((state) => state.likedLocations.searchValue);
  const filteredLocations = useSelector(
    (state) => state.likedLocations.filteredLocations
  );
  const isFetchingData = useSelector(
    (state) => state.likedLocations.isFetchingData
  );

  const theme = useTheme();

  const dispatch = useDispatch();

  const headerHeightAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE + pxGenerator(10)],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const opacityAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const elevationAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 4],
    extrapolate: "clamp",
  });

  const shadowAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.23],
    extrapolate: "clamp",
  });

  const topPositionAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_MIN_HEIGHT + pxGenerator(3)],
    extrapolate: "clamp",
  });

  function fetchLikedLocations() {
    dispatch(getLikedLocations());
  }

  useEffect(() => {
    fetchLikedLocations();
  }, []);

  return (
    <Container>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeightAnim,
            elevation: elevationAnim,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: shadowAnim,
            shadowRadius: 2.62,
          },
        ]}
      >
        <Animated.View
          style={[styles.bar, { position: "relative", top: topPositionAnim }]}
        >
          <Animated.View style={{ opacity: opacityAnim }}>
            <Typography variant="h1">Liked Locations</Typography>
          </Animated.View>
          <View
            style={{
              height: HEADER_MIN_HEIGHT,
              position: "relative",
              marginTop: pxGenerator(1.5),
            }}
          >
            <SearchBar
              value={searchValue}
              onChange={(newVal) => dispatch(setSearchValue(newVal))}
            />
          </View>
        </Animated.View>
      </Animated.View>

      <FlatList
        data={filteredLocations}
        renderItem={(props) => <Item {...props} />}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            onRefresh={fetchLikedLocations}
            refreshing={isFetchingData}
            progressViewOffset={HEADER_MAX_HEIGHT}
            progressBackgroundColor={theme.accent.primary}
          />
        }
        contentInset={{ top: Platform.OS === "ios" && HEADER_MAX_HEIGHT - 40 }}
        // contentOffset={{ x: 0, y: -HEADER_MAX_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          paddingTop: Platform.OS === "android" && HEADER_MAX_HEIGHT,
          paddingHorizontal: pxGenerator(8),
        }}
      />
    </Container>
  );
};

export default LikedLocationsScreen;
