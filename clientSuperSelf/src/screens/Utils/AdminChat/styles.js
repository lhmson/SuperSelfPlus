import styled from "styled-components";
import { StyleSheet } from "react-native";
import COLOR from "../../../constants/colors";

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLOR.white,
  },
});
export default styles;
