import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imagesAndButtonCommon: {
    marginTop: pxGenerator(4),
    borderRadius: pxGenerator(4),
  },
  openCameraContainer: {
    borderWidth: pxGenerator(1),
    borderStyle: "dotted",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  containerSpacer: {
    marginVertical: pxGenerator(4),
  },
  mapContainer: {
    overflow: "hidden",
  },
  borderRadius: {
    borderRadius: pxGenerator(4),
  },
  descriptionInput: {
    height: 120,
    paddingVertical: pxGenerator(1),
  },
});

export default styles;
