import { Platform } from "react-native";

export const createFormData = (img) => {
  const data = new FormData();

  data.append("avatar", {
    uri: Platform.OS === "ios" ? `file:///${img}` : img,
    type: "image/jpeg",
    name: "image.jpg",
  });

  //   Object.keys(body).forEach((key) => {
  //     data.append(key, body[key]);
  //   });

  return data;
};
