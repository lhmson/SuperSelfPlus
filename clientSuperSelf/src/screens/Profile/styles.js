import styled from "styled-components";
import { StyleSheet } from "react-native";
import COLOR from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  // edit user
  imageBg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    // top: 0,
    // left: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    // position: "absolute",
    padding: 8,
    // backgroundColor: "white",
  },
  userPhotoPicker: {
    backgroundColor: COLOR.whiteSmoke,
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
    overflow: "hidden",
    marginVertical: 16,
  },
  defaultPhoto: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhoto: {
    flex: 1,
  },
});
export default styles;
