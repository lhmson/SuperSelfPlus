import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import COLOR from "../../../constants/colors";
import styles from "../styles";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyTextInput from "../../../components/MyTextInput";
import MyFloatingButton from "../../../components/MyFloatingButton";

import * as apiUser from "../../../api/user";
import * as apiUpload from "../../../api/upload";
import { useUser } from "../../../context/UserContext";
import { BACKEND_URL } from "../../../constants/config";
import { createFormData } from "../../../utils/upload";
import { logoUrl } from "../../../utils/logo";
import Loading from "../../../components/Loading";
import { shallowCompare } from "../../../utils/objHandler";
import PremiumModal from "../ModalPremium";

const errors = ["You should enter username"];

function EditUserScreen({ navigation, route }) {
  const { item } = route.params;
  const user = useUser();

  const [username, setUsername] = useState(item.username);
  const [description, setDescription] = useState(item.userInfo?.description);
  const [profilePhoto, setProfilePhoto] = useState(item.avatarUrl);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [isModalPremium, setIsModalPremium] = useState(true);
  useEffect(() => {}, []);

  const validateHabitForm = () => {
    if (!username) {
      setError(errors[0]);
      return false;
    }
    return true;
  };

  const handleEdit = async () => {
    if (!validateHabitForm()) {
      return;
    }

    if (loading) {
      return;
    }

    setError("");

    setLoading(true);

    const avatar = await handleUploadPhoto();
    console.log("avatar", avatar);
    try {
      const updatedUser = {
        ...item,
        username,
        avatarUrl: avatar,
        userInfo: {
          description,
        },
      };

      // console.log("different");
      apiUser
        .editMyProfile(updatedUser)
        .then(() => {
          Toast.show({
            type: "success", // success, error, info
            text1: "Successfully update profile 🎉",
            text2: `${username}`,
            visibilityTime: 2500,
            onShow: () => {},
            onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
            onPress: () => {},
          });
          navigation.navigate("Profile");
        })
        .catch((error) => {
          console.log("Error when updating my profile", error);
          alert("Error when updating my profile");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      alert("Cannot upload avatar", error);
    }
  };

  //#region handle avatar pick

  const getPermissions = async () => {
    if (Platform.OS !== "web") {
      //TODO: camera roll deprecated
      // https://github.com/expo/expo/issues/11504
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status;
    }
  };

  const pickImageFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      alert("Error when picking image");
      console.log("Error when picking image ", error);
    }
  };

  const pickImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    try {
      if (cameraPermission.status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
        if (!result.cancelled) {
          setProfilePhoto(result.uri);
        }
      }
    } catch (error) {
      alert("Error when taking photo");
      console.log("Error when taking photo", error);
    }
  };

  const addPhotoFromGallery = async () => {
    const status = await getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    pickImageFromGallery();
  };

  const addPhotoFromCamera = async () => {
    const status = await getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    pickImageFromCamera();
  };

  const chooseAvatar = () => {
    Alert.alert(
      "Avatar pick",
      "Choose one type of pick",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Gallery",
          onPress: () => {
            addPhotoFromGallery();
          },
        },
        {
          text: "Camera",
          onPress: () => {
            addPhotoFromCamera();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUploadPhoto = async () => {
    if (profilePhoto === item.avatarUrl) {
      // console.log("There no img change");
      return logoUrl;
    }
    const data = createFormData(profilePhoto);

    try {
      const res = await apiUpload.uploadAvatar(data);
      if (res) {
        return res.data.data.avatar;
      } else {
        return logoUrl;
      }
    } catch (error) {
      console.log("Error when upload img", error);
    }
  };

  //#endregion

  return (
    <View style={styles.container}>
      <PremiumModal
        isVisible={isModalPremium}
        setIsVisible={setIsModalPremium}
      ></PremiumModal>
      <ImageBackground
        source={require("../../../utils/resources/bg/postbg3.jpg")}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.5 }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={chooseAvatar}
            style={styles.userPhotoPicker}
          >
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={styles.profilePhoto}
              />
            ) : (
              <View style={styles.defaultPhoto}>
                <AntDesign name="plus" size={24} color={COLOR.orange} />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.row}>
            <MyText>Username</MyText>
            <MyTextInput
              placeholder="USERNAME"
              long3
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(title) => setUsername(title)}
              value={username}
              style={{
                borderColor: error === errors[0] ? COLOR.red : COLOR.grey,
              }}
            />
          </View>

          <MyText>Description</MyText>
          <MyTextInput
            placeholder="DESCRIPTION"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={false}
            onChangeText={(description) => setDescription(description)}
            value={description}
          />

          <MyButton
            onPress={() => {
              setIsModalPremium(true);
            }}
          >
            <MyText b5 color={COLOR.white}>
              Upgrade membership
            </MyText>
          </MyButton>
        </View>
      </ScrollView>
      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="topRight"
        onPress={handleEdit}
      >
        {loading ? (
          <Loading size="small" noText />
        ) : (
          <Entypo name="save" size={24} color={COLOR.white} />
        )}
      </MyFloatingButton>
    </View>
  );
}

export default EditUserScreen;
