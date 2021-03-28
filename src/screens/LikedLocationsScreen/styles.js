import { StyleSheet } from "react-native";

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
  flatList: { flex: 1 },
});
