import styled from "styled-components";
import { StyleSheet } from "react-native";
import COLOR from "../../constants/colors";

const styles = StyleSheet.create({
  scrollViewContent: {
    // flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.whiteSmoke,
  },
  imageBg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    // top: 0,
    // left: 0,
  },
  title: {
    padding: 16,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    padding: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // add habit
  picker: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  pickerItem: {
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconInput: {
    position: "absolute",
    top: 25,
    right: 10,
  },
  // habit list
});

export default styles;
