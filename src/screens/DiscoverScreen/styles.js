import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

export default StyleSheet.create({
  fakeSearchBar: {
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: pxGenerator(2),
    marginTop: pxGenerator(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  iconContainer: {
    marginRight: pxGenerator(2),
    marginTop: -3,
  },
});
