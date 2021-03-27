import React, { useState, useRef } from "react";
import { View, FlatList, Animated, Dimensions, StyleSheet } from "react-native";
// import styles from "./styles";
import Typography from "../../components/Typography";
import Container from "../../components/Container";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import pxGenerator from "../../helpers/pxGenerator";
import SearchBar from "../../components/SearchBar";

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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "23212-3da1-471f-bd96-145571e29d72",
    title: "Forth Item",
  },
];

const Item = ({ index }) => {
  return (
    <View>
      <View style={styles.row}>
        <Typography>Title</Typography>
      </View>
    </View>
  );
};

const LikedLocationsScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

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
            <SearchBar />
          </View>
        </Animated.View>
      </Animated.View>

      <FlatList
        data={DATA}
        renderItem={() => <Item />}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          marginTop: HEADER_MAX_HEIGHT,
          paddingHorizontal: pxGenerator(8),
        }}
        ListFooterComponent={() => (
          // Without this, the content renders under the bottom navigation bar
          // With this, the scroller on android doesn't reach all the way to the bottom
          // even though it does show the content correctly
          // should get fixed at some point soon
          <View style={{ marginBottom: HEADER_MAX_HEIGHT }} />
        )}
      />
    </Container>
  );
};

export default LikedLocationsScreen;
