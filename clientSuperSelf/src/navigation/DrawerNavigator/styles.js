import { StyleSheet } from "react-native";
import COLOR from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: COLOR.green,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerImage: {
    margin: 10,
    width: 160,
    height: 120,
  },
});

export default styles;
