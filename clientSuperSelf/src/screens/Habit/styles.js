import styled from "styled-components";
import { StyleSheet } from "react-native";
import COLOR from "../../constants/colors";
import FONT from "../../constants/font";

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
    // alignItems: "center",
    // justifyContent: "center",
    // position: "absolute",
    padding: 8,
    // backgroundColor: "white",
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
  buttonRun: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    left: 15,
    top: 15,
  },
  buttonEvent: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    top: 15,
    right: 15,
  },
  // habit list
  calendar: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 10,
    fontFamily: FONT.Nunito_700,
  },
  calendarHeader: {
    color: COLOR.blue,
    fontFamily: FONT.Nunito_700,
    fontSize: 16,
  },
  calendarDate: {
    color: COLOR.white,
    fontFamily: FONT.Nunito_700,
  },
  highlightDate: {
    color: COLOR.blue,
    fontFamily: FONT.Nunito_700,
  },
  disableDate: {
    color: COLOR.grey,
    fontFamily: FONT.Nunito_700,
  },
  buttonMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconEventItem: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    top: -20,
    right: -10,
  },
  // suggestion
  themeCard: {
    // alignItems: "center",
  },
});

export default styles;
