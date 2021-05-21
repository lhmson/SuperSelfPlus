import React, { useState, useContext } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyTextInput from "../../../components/MyTextInput";
import Loading from "../../../components/Loading";
import styles from "../styles";

import COLOR from "../../../constants/colors";

import { UserContext } from "../../../context/UserContext";
// import User from "../../../api/Users";
import * as api from "../../../api/auth";

function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [loading, setLoading] = useState();
  // const [profilePhoto, setProfilePhoto] = useState();
  const [_, setUser] = useContext(UserContext);

  const eye = <Entypo name={eyeIcon} size={24} color="black" />;

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
    setEyeIcon(eyeIcon == "eye" ? "eye-with-line" : "eye");
  };

  //#region Profile photo handler
  // const getPermissions = async () => {
  //   if (Platform.OS !== "web") {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     return status;
  //   }
  // };

  // const pickImageFromGallery = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 0.5,
  //     });
  //     if (!result.cancelled) {
  //       setProfilePhoto(result.uri);
  //     }
  //   } catch (error) {
  //     console.log("Error when picking image: " + error);
  //   }
  // };

  // const pickImageFromCamera = async () => {
  //   const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
  //   try {
  //     if (cameraPermission.status === "granted") {
  //       let result = await ImagePicker.launchCameraAsync({
  //         allowsEditing: true,
  //         aspect: [1, 1],
  //       });
  //       if (!result.cancelled) {
  //         setProfilePhoto(result.uri);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error when taking photo: " + error);
  //   }
  // };

  // const addPhotoFromGallery = async () => {
  //   const status = await getPermissions();

  //   if (status !== "granted") {
  //     alert("We need permissions to get access to your camera library");
  //     return;
  //   }

  //   pickImageFromGallery();
  // };

  // const addPhotoFromCamera = async () => {
  //   const status = await getPermissions();

  //   if (status !== "granted") {
  //     alert("We need permissions to get access to your camera library");
  //     return;
  //   }

  //   pickImageFromCamera();
  // };

  // const chooseAvatar = () => {
  //   Alert.alert(
  //     "Avatar pick",
  //     "Choose one type of pick",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => {},
  //         style: "cancel",
  //       },
  //       {
  //         text: "Gallery",
  //         onPress: () => {
  //           addPhotoFromGallery();
  //         },
  //       },
  //       {
  //         text: "Camera",
  //         onPress: () => {
  //           addPhotoFromCamera();
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };
  //#endregion

  const handleLogInGoogle = async () => {
    // await User.logInWithGoogle();
  };

  const handleSignUp = async () => {
    setLoading(true);
    const user = { username, email, password };

    api
      .signUp(user)
      .then(async (res) => {
        const signedUser = res.data.result;
        const token = res.data.token;
        setUser({ username, email, uid: signedUser._id, isLoggedIn: true });

        try {
          const data = {
            token,
            result: {
              username: signedUser.username,
              uid: signedUser._id,
              email,
            },
          };
          await AsyncStorage.setItem("token", JSON.stringify(data));
          // alert(JSON.stringify(data));
        } catch (error) {
          alert("Error saving token to storage");
          console.log("Error saving token to storage ", error);
        }
      })
      .catch((error) => {
        alert("Error when signing up, please try again ");
        console.log("Error when signing up ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../utils/resources/bg/postbg2.jpg")}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.5 }}
      />
      <View style={styles.content}>
        <View
          style={styles.auth}
          // behavior="position"
          // keyboardVerticalOffset={-Dimensions.get("screen").height / 6}
        >
          <View style={styles.title}>
            <MyText b5 size3 center>
              Join us to get start
            </MyText>
          </View>

          {/* <TouchableOpacity
            style={styles.userPhotoPicker}
            onPress={chooseAvatar}
          >
            {profilePhoto ? (
              <Image
                style={styles.profilePhoto}
                source={{ uri: profilePhoto }}
              />
            ) : (
              <View style={styles.defaultPhoto}>
                <AntDesign name="plus" size={24} color={COLOR.red} />
              </View>
            )}
          </TouchableOpacity> */}

          <MyTextInput
            placeholder="USERNAME"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(username) => setUsername(username)}
            value={username}
          />

          <MyTextInput
            placeholder="EMAIL"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />

          <View>
            <MyTextInput
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={passwordShown}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => togglePasswordVisibility()}
            >
              {eye}
            </TouchableOpacity>
          </View>

          <MyButton
            color={COLOR.green}
            size5
            onPress={() => handleSignUp()}
            disabled={loading}
          >
            {loading ? (
              <Loading noText size="small" />
            ) : (
              <MyText b5 center color={COLOR.white}>
                SIGN UP
              </MyText>
            )}
          </MyButton>
        </View>

        <View style={styles.action}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <MyText size4 center>
              Have an account?
              <MyText b6 color={COLOR.blue}>
                {" "}
                Sign In
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

export default SignUpScreen;
