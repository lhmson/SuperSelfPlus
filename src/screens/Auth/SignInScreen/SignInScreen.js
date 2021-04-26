import React from "react";
import { View, Button } from "react-native";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MyText b6>Signin screen</MyText>
      <Button
        title="Sign up"
        onPress={() => navigation.navigate("SignUp")}
      ></Button>
    </View>
  );
}

export default SignInScreen;
