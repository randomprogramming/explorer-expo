import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

export default StyleSheet.create({
  flex: { flex: 1 },
  scrollView: { flexGrow: 1 },
  topMargin: { marginTop: pxGenerator(3) },
  paddingHorizontal: { paddingHorizontal: pxGenerator(8) },
  paddingVertical: { paddingTop: pxGenerator(4), marginBottom: pxGenerator(4) },
});
