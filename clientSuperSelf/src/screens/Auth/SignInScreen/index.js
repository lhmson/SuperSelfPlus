import React, { useContext, useState } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";

import { useUser } from "../../../context/UserContext";

import * as api from "../../../api/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [loading, setLoading] = useState(false);

  const user = useUser();
  const { updateUser } = user;

  const eye = <Entypo name={eyeIcon} size={24} color="black" />;

  const togglePasswordVisibility = () => {
    setIsPasswordShown(isPasswordShown ? false : true);
    setEyeIcon(eyeIcon == "eye" ? "eye-with-line" : "eye");
  };

  const handleLogInGoogle = async () => {
    // await User.logInWithGoogle();
  };

  const handleLogIn = async () => {
    setLoading(true);

    api
      .signIn({ email, password })
      .then(async (res) => {
        const signedUser = res.data.result;
        const token = res.data.token;
        updateUser({
          username: signedUser.username,
          email,
          uid: signedUser._id,
          isLoggedIn: true,
          createdAt: signedUser.createdAt,
        });
        try {
          const data = {
            token,
            result: {
              username: signedUser.username,
              uid: signedUser._id,
              email,
              createdAt: signedUser.createdAt,
            },
          };
          await AsyncStorage.setItem("superself_token", JSON.stringify(data));
          // alert(JSON.stringify(data));
        } catch (e) {
          alert("Error saving token to storage");
          console.log("Error saving token to storage ", error);
        }
      })

      .catch((error) => {
        if (error.response.status === 404) {
          alert("User does not exist, try again");
          return;
        }
        alert("Error when logging in, try again.");
        console.log("Error when logging in", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../utils/resources/bg/postbg3.jpg")}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.5 }}
      />
      <View style={styles.content}>
        <View
          style={styles.auth}
          // behavior="position" keyboardVerticalOffset={10}
        >
          <View style={styles.title}>
            <MyText b5 size3 center>
              {`Let's be SuperSelf\nHave a nice day`}
            </MyText>
          </View>

          <MyTextInput
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            placeholder="EMAIL"
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />

          <View>
            <MyTextInput
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              placeholder="PASSWORD"
              secureTextEntry={isPasswordShown}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => togglePasswordVisibility()}
            >
              {eye}
            </TouchableOpacity>
          </View>

          <MyButton size5 onPress={() => handleLogIn()} disabled={loading}>
            {loading ? (
              <Loading noText size="small" />
            ) : (
              <MyText b5 color={COLOR.white}>
                SIGN IN
              </MyText>
            )}
          </MyButton>
        </View>

        <View style={styles.action}>
          <TouchableOpacity onPress={() => {}}>
            <MyText b5 color={COLOR.blue}>
              Forgot Password?
            </MyText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <MyText size4 center>
              New to the world?
              <MyText b6 color={COLOR.blue}>
                {" "}
                Sign Up
              </MyText>
            </MyText>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              onPress={() => handleLogInGoogle()}
              style={styles.socialIcon}
            >
              <AntDesign name="google" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLogInGoogle()}
              style={styles.socialIcon}
            >
              <AntDesign name="facebook-square" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLogInGoogle()}
              style={styles.socialIcon}
            >
              <AntDesign name="twitter" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <MyText b5 size5 color={COLOR.blue}>
              Term of Services
            </MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MyText b5 size5 color={COLOR.blue}>
              Privacy and Policies
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignInScreen;
