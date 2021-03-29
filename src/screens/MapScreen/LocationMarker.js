import React, { useState } from "react";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { Marker } from "react-native-maps";
import useTheme from "../../hooks/useTheme";
import Icon from "../../components/Icon";
import PropTypes from "prop-types";

const IMAGE_SIZE = 50;

const LocationMarker = ({ location, onPress }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const theme = useTheme();

  return (
    <Marker
      coordinate={{
        longitude: location.longitude,
        latitude: location.latitude,
      }}
      onPress={() => onPress(location.id)}
    >
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
              source={{ uri: location.media[0].url }}
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
});
