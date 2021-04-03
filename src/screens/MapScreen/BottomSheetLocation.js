import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import Typography from "../../components/Typography";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import pxGenerator from "../../helpers/pxGenerator";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { ScrollView } from "react-native-gesture-handler";
import AnimatedLikeIcon from "../../components/AnimatedLikeIcon";
import {
  checkIfLocationIsLiked,
  dislikeLocation,
  markLocationAsLiked,
} from "../../actions/basicLikeActions";

const { width: screenWidth } = Dimensions.get("window");
const contentPadding = 60;

const CustomBackground = ({ style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        style,
        styles.customBackground,
        {
          backgroundColor: theme.background.primary[1],
        },
      ]}
    />
  );
};

const CustomHandle = ({ isLocationSelected }) => {
  const theme = useTheme();

  return (
    <View style={styles.handleContainer}>
      <View
        style={[
          styles.customHandle,
          {
            backgroundColor: isLocationSelected
              ? theme.background.secondary[0]
              : theme.accent.secondary,
          },
        ]}
      />
    </View>
  );
};

// TODO: Change the background color to white even in dark mode
const BottomSheetLocation = ({ sheetRef, snapPoints, isLocationSelected }) => {
  const [isSelectedLocationLiked, setIsSelectedLocationLiked] = useState(false);

  const selectedLocation = useSelector((state) => state.map.selectedLocation);
  const locations = useSelector((state) => state.map.locations);
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  const theme = useTheme();

  async function handleLikeButtonPress() {
    if (isSelectedLocationLiked) {
      const response = await dislikeLocation(selectedLocation.id);
      if (response) {
        setIsSelectedLocationLiked(false);
      }
    } else {
      const response = await markLocationAsLiked(selectedLocation.id);
      if (response) {
        setIsSelectedLocationLiked(true);
      }
    }
  }

  const renderWhenLocationNotSelected = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{locations.length} locations in the region</Typography>
    </View>
  );

  const renderWhenLocationSelected = () => (
    <ScrollView style={styles.scrollViewContainer}>
      <Carousel
        layout="stack"
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - contentPadding}
        data={selectedLocation.media}
        renderItem={renderCarouselItem}
        hasParallaxImages
        loop
      />

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.primaryInfoContainer}>
            <Typography variant="h2">{selectedLocation.title}</Typography>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Typography color="accentSecondary">Added by: </Typography>
              <Image
                source={{ uri: selectedLocation.createdBy.profilePictureUrl }}
                style={[
                  styles.smallProfilePicture,
                  { borderColor: theme.accent.secondary },
                ]}
              />
              <Typography color="accentSecondary">
                {selectedLocation.createdBy.username}
              </Typography>
            </View>
          </View>

          {isLoggedIn && (
            <View style={styles.likeButtonContainer}>
              <AnimatedLikeIcon
                onPress={handleLikeButtonPress}
                isLocationLiked={isSelectedLocationLiked}
                size={34}
              />
            </View>
          )}
        </View>

        <View>
          <Typography>{selectedLocation.description}</Typography>
        </View>
      </View>
    </ScrollView>
  );

  const renderCarouselItem = ({ item }, parallaxProps) => {
    return (
      <View style={styles.shadowContainer}>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.url }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0}
            {...parallaxProps}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    // Whenever the selected location changes, we check if it's an already liked location
    if (isLoggedIn) {
      checkIfLocationIsLiked(selectedLocation.id).then((response) =>
        setIsSelectedLocationLiked(response)
      );
    }
  }, [selectedLocation, isLoggedIn]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      backgroundComponent={CustomBackground}
      style={styles.sheet}
      enableHandlePanningGesture={isLocationSelected}
      enableContentPanningGesture={false}
      handleComponent={({ props }) => (
        <CustomHandle {...props} isLocationSelected={isLocationSelected} />
      )}
    >
      {isLocationSelected
        ? renderWhenLocationSelected()
        : renderWhenLocationNotSelected()}
    </BottomSheet>
  );
};

export default BottomSheetLocation;

BottomSheetLocation.propTypes = {
  snapPoints: PropTypes.array,
  isLocationSelected: PropTypes.bool,
};

const styles = StyleSheet.create({
  sheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  customBackground: {
    borderRadius: pxGenerator(8),
  },
  handleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: pxGenerator(4),
  },
  customHandle: {
    width: 30,
    height: 5,
    borderRadius: 100,
  },
  scrollViewContainer: { flex: 1 },
  shadowContainer: {
    // This component must have padding so that its children can show shadow without overflowing
    paddingBottom: pxGenerator(3),
  },
  item: {
    width: screenWidth - contentPadding,
    height: screenWidth - contentPadding,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white", //TODO: This is for the opacity over the images during a transition,  Maybe change this to black
    borderRadius: pxGenerator(6),
    elevation: 6, // this is the shadow from item, for some reason elevation doesn't work on the item style, but it does here
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  likeButtonContainer: {
    paddingBottom: pxGenerator(8),
  },
  content: {
    paddingHorizontal: contentPadding / 2,
    marginTop: pxGenerator(3),
  },
  infoContainer: {
    flexDirection: "row",
  },
  primaryInfoContainer: { flex: 1 },
  smallProfilePicture: {
    height: 17,
    width: 17,
    borderRadius: 30,
    borderWidth: 1,
    marginLeft: 2,
    marginRight: 1,
  },
});
