import React from "react";
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import Typography from "./Typography";
import Swiper from "react-native-swiper";

const IMAGE_SIZE = Dimensions.get("screen").width;

export const Location = ({ item }) => {
  const { id, title, media } = item;

  const theme = useTheme();

  function handleLocationPress(id) {
    // TODO: Make the touchableopacity redirect to the location screen on press
    console.log("Pressed location: ", id);
  }

  function renderPagination(index, total) {
    // dots only show when there's more than 1 image
    if (total <= 1) return null;

    let dots = [];
    const ActiveDot = (
      <View
        style={[
          styles.dot,
          {
            backgroundColor: theme.accent.primary,
          },
        ]}
      />
    );
    const Dot = (
      <View
        style={[
          styles.dot,
          {
            backgroundColor: theme.accent.secondaryShades[0],
          },
        ]}
      />
    );

    for (let i = 0; i < total; i++) {
      dots.push(
        i === index
          ? React.cloneElement(ActiveDot, { key: i })
          : React.cloneElement(Dot, { key: i })
      );
    }

    return (
      <View pointerEvents="none" style={styles.paginationOuterContainer}>
        <View
          style={[
            styles.paginationInnerContainer,
            {
              backgroundColor: theme.background.primary[1],
            },
          ]}
        >
          {dots}
        </View>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          position: "relative",
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
        }}
      >
        <Swiper
          style={styles.swiper}
          loop={false}
          renderPagination={renderPagination}
        >
          {media.map((image) => (
            <Pressable key={image.id} onPress={() => handleLocationPress(id)}>
              <Image
                source={{ uri: image.url }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                }}
              />
            </Pressable>
          ))}
        </Swiper>
      </View>
      <Pressable onPress={() => handleLocationPress(id)}>
        <Typography fontWeight="semi-bold" fontSize={20}>
          {title}
        </Typography>
      </Pressable>
    </View>
  );
};

const LocationFlatList = ({
  locations,
  refreshControl,
  ListEmptyComponent,
  contentInset,
  onScroll,
  contentContainerStyle,
}) => {
  return (
    <FlatList
      data={locations}
      renderItem={(props) => <Location {...props} />}
      style={styles.flatList}
      scrollEventThrottle={16}
      refreshControl={refreshControl}
      ListEmptyComponent={ListEmptyComponent}
      contentInset={contentInset}
      onScroll={onScroll}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

export default LocationFlatList;

const styles = StyleSheet.create({
  flatList: { flex: 1 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  paginationOuterContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: pxGenerator(2),
    paddingVertical: pxGenerator(1),
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  swiper: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
