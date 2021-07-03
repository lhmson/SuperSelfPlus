import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width; // get current width
const SCALE = 375; // constant, 375 is standard width of  iphone 6 / 7 / 8

export const scaleFontSize = (fontSize) => {
  const ratio = fontSize / SCALE; // get ratio based on your standard scale
  const newSize = Math.round(ratio * Dimensions.get("window").width);
  return newSize;
};
