import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: pxGenerator(2),
  },
  imagesAndButtonCommon: {
    marginTop: pxGenerator(4),
    borderRadius: pxGenerator(4),
  },
  openCameraContainer: {
    borderWidth: 4,
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
});

export default styles;
