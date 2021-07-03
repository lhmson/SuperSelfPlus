import React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { logoUrl } from "../../utils/logo";

const ComingSoon = () => {
  return (
    <View style={styles.center}>
      <Image
        source={{ uri: "https://i.ibb.co/ZV31Gyj/comesoon1.jpg" }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          resizeMode: "cover",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ComingSoon;
