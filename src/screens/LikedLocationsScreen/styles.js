import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

export default StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    paddingHorizontal: pxGenerator(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2.62,
  },
  bar: {
    marginTop: pxGenerator(4),
    position: "relative",
  },
  searchBarContainer: {
    marginTop: pxGenerator(1.5),
  },
  centeredText: { textAlignVertical: "center", textAlign: "center" },
  listEmptyComponentMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
    alignContent: "center",
    paddingHorizontal: pxGenerator(8),
    paddingVertical: pxGenerator(8),
  },
});
