import React, { useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  RefreshControl,
  Platform,
} from "react-native";
import styles from "./styles";
import Typography from "../../components/Typography";
import Container from "../../components/Container";
import pxGenerator from "../../helpers/pxGenerator";
import SearchBar from "../../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../reducers/likedLocationsReducer";
import { getLikedLocations } from "../../actions/likedLocationsActions";
import useTheme from "../../hooks/useTheme";
import Location from "./Location";

const HEADER_MAX_HEIGHT = 140;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
    inputRange: [0, HEADER_SCROLL_DISTANCE + pxGenerator(5)],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const opacityAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 20],
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
            backgroundColor: theme.background.primary[0],
            height: headerHeightAnim,
            elevation: elevationAnim,
            shadowOpacity: shadowAnim,
          },
        ]}
      >
        <Animated.View style={[styles.bar, { top: topPositionAnim }]}>
          <Animated.View style={{ opacity: opacityAnim }}>
            <Typography variant="h1">Liked Locations</Typography>
          </Animated.View>
          <View
            style={[
              styles.searchBarContainer,
              {
                height: HEADER_MIN_HEIGHT,
              },
            ]}
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
        renderItem={(props) => <Location {...props} />}
        style={styles.flatList}
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          paddingTop: Platform.OS === "android" && HEADER_MAX_HEIGHT,
        }}
      />
    </Container>
  );
};

export default LikedLocationsScreen;
