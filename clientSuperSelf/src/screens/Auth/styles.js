import styled from "styled-components";
import { StyleSheet } from "react-native";
import COLOR from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  auth: {
    width: "100%",
  },
  title: {
    padding: 16,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: 24,
  },
  action: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  socialContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    top: "30%",
    right: 10,
  },
  socialIcon: {
    alignItems: "center",
    padding: 15,
  },
  // userPhotoPicker: {
  //   backgroundColor: COLOR.whiteSmoke,
  //   width: 100,
  //   height: 100,
  //   borderRadius: 100,
  //   alignSelf: "center",
  //   overflow: "hidden",
  // },
  // defaultPhoto: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // profilePhoto: {
  //   flex: 1,
  // },
});

export default styles;
