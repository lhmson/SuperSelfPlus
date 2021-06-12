import styled from "styled-components";
import { StyleSheet } from "react-native";
import COLOR from "../../../constants/colors";

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.whiteSmoke,
  },
});
export default styles;
