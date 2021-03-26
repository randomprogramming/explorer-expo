import React, { useState, useRef } from "react";
import { View, FlatList, Animated, Dimensions, StyleSheet } from "react-native";
// import styles from "./styles";
import Typography from "../../components/Typography";
import Container from "../../components/Container";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 99,
  },
  bar: {
    marginTop: 28,
    height: 32,
    position: "relative",
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 300,
    margin: 16,
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

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE + 100],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const opacityAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const topAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });

  const elevationAnim = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 10],
    extrapolate: "extend",
  });

  return (
    <Container defaultPadding>
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, elevation: elevationAnim },
        ]}
      >
        <View style={styles.bar}>
          <Animated.View
            style={{ position: "relative", top: topAnim, opacity: opacityAnim }}
          >
            <Typography variant="h1">Liked Locations</Typography>
          </Animated.View>
          <Animated.View
            style={{ position: "relative", left: 0, top: topAnim }}
          >
            <TextInput
              style={{
                backgroundColor: "#f8f6f6",
                borderRadius: 60,
                width: Dimensions.get("window").width - 100,
                paddingVertical: 15,
              }}
            />
          </Animated.View>
        </View>
      </Animated.View>
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.scrollViewContent}>
          {DATA.map(() => (
            <Item />
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default LikedLocationsScreen;
