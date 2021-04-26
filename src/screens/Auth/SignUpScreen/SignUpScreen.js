import React from "react";
import { View, Button } from "react-native";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MyText b6>Signup screen</MyText>
      <Button
        title="Sign in"
        onPress={() => navigation.navigate("SignIn")}
      ></Button>
    </View>
  );
}

export default SignUpScreen;
