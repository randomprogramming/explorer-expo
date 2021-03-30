import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Typography from "../../components/Typography";
import getThumbnailFromMedia from "../../helpers/getThumbnailFromMedia";
import pxGenerator from "../../helpers/pxGenerator";

const Location = ({ index, item }) => {
  const { title, media } = item;

  return (
    // TODO: Make the touchableopacity redirect to the location screen on press
    <TouchableOpacity style={styles.row}>
      <View>
        <Image
          source={{
            uri: getThumbnailFromMedia(media).url,
          }}
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").width,
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Typography fontWeight="semi-bold" fontSize={20}>
          {title}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default Location;

const styles = StyleSheet.create({
  row: {
    marginTop: pxGenerator(4),
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginTop: pxGenerator(4),
  },
});
