import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Marker } from "react-native-maps";
import useTheme from "../../hooks/useTheme";
import Icon from "../../components/Icon";
import PropTypes from "prop-types";
import getThumbnailFromMedia from "../../helpers/getThumbnailFromMedia";
import Typography from "../../components/Typography";
import pxGenerator from "../../helpers/pxGenerator";

const IMAGE_SIZE = 50;

const LocationMarker = ({ location, onPress }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [shouldTrackViewChanges, setShouldTrackViewChanges] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (!isImageLoading && shouldTrackViewChanges) {
      setShouldTrackViewChanges(false);
    }
  }, [isImageLoading]);

  return (
    <Marker
      coordinate={{
        longitude: location.longitude,
        latitude: location.latitude,
      }}
      onPress={() => onPress(location.id)}
      // Since the isImageLoading may or may not change multiple times,
      // we have to use a new field to track this
      // This should be true until the image loads, after which it should stay FALSE,
      // the entire time it is mounted
      tracksViewChanges={shouldTrackViewChanges}
    >
      <View
        style={[
          styles.likeCountContainer,
          {
            backgroundColor: theme.accent.primary,
          },
        ]}
      >
        <Icon name="heart" size={10} color={theme.common.white} />
        <Typography
          fontSize={10}
          color={theme.common.white}
          style={styles.likeText}
        >
          {location.likeCount}
        </Typography>
      </View>
      <View style={styles.main}>
        <View
          style={[
            styles.outerImageContainer,
            {
              backgroundColor: theme.background.primary[1],
              borderColor: theme.accent.secondary,
            },
          ]}
        >
          <View style={styles.innerImageContainer}>
            <Image
              source={{ uri: getThumbnailFromMedia(location.media) }}
              style={styles.image}
              onLoadStart={() => setIsImageLoading(true)}
              onLoadEnd={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <View
                style={[
                  styles.loadingIconContainer,
                  { backgroundColor: theme.background.primary[1] },
                ]}
              >
                <ActivityIndicator animating color={theme.accent.primary} />
              </View>
            )}
          </View>
        </View>
        <View style={{ marginTop: -1 }}>
          <Icon name="markerArrow" size={9} color={theme.accent.secondary} />
        </View>
        {/* TODO: Add small shadow under the marker */}
      </View>
    </Marker>
  );
};

export default LocationMarker;

LocationMarker.propTypes = {
  location: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  outerImageContainer: {
    padding: 2,
    borderRadius: 100,
    borderWidth: 1,
  },
  innerImageContainer: {
    borderRadius: 100,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    zIndex: 99,
  },
  loadingIconContainer: {
    position: "absolute",
    zIndex: 101,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    justifyContent: "center",
  },
  likeCountContainer: {
    position: "absolute",
    zIndex: 111,
    // You cant draw outside the parent view in android from what i understand, while
    // this works completely fine on ios
    right: Platform.select({ ios: -pxGenerator(2), android: 0 }),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: pxGenerator(1),
    paddingVertical: pxGenerator(0.5),
    borderRadius: pxGenerator(3),
  },
  likeText: {
    marginLeft: pxGenerator(1),
  },
});
