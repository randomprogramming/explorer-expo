import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

export default StyleSheet.create({
  linkContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: pxGenerator(4),
  },
  menu: {
    marginTop: pxGenerator(4),
  },
  menuItem: {
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingVertical: pxGenerator(4),
    alignItems: "center",
  },
});
