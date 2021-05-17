import React, { useContext, useState } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";

import { UserContext } from "../../../context/UserContext";
import User from "../../../api/Users";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [loading, setLoading] = useState(false);
  const [_, setUser] = useContext(UserContext);
  // const [_setting, setSetting] = useContext(SettingContext);
  // const settingFirebase = useContext(SettingFirebaseContext);

  const eye = <Entypo name={eyeIcon} size={24} color="black" />;

  const togglePasswordVisibility = () => {
    setIsPasswordShown(isPasswordShown ? false : true);
    setEyeIcon(eyeIcon == "eye" ? "eye-with-line" : "eye");
  };

  const handleLogInGoogle = async () => {
    await User.logInWithGoogle();
  };

  const handleLogIn = async () => {
    setLoading(true);

    try {
      await User.logIn(email, password);
      const uid = User.getCurrentUser().uid;
      const userInfo = await User.getUserInfo(uid);
      // const settingInfo = await settingFirebase.getSettingInfo(uid);
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        // profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
        // birthday: userInfo.birthday,
        // gender: userInfo.gender,
      });
    } catch (error) {
      alert("Error when logging in, try again", error.message);
      console.log("Error when logging in", error);
    } finally {
      setLoading(false);
    }
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
              onPress={togglePasswordVisibility}
            >
              {eye}
            </TouchableOpacity>
          </View>

          <MyButton size5 onPress={handleLogIn} disabled={loading}>
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
              onPress={handleLogInGoogle}
              style={styles.socialIcon}
            >
              <AntDesign name="google" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogInGoogle}
              style={styles.socialIcon}
            >
              <AntDesign name="facebook-square" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogInGoogle}
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
