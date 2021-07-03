import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import styled from "styled-components";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Toast from "react-native-toast-message";

import MyButton from "../../../components/MyButton";
import MyFloatingButton from "../../../components/MyFloatingButton";
import Loading from "../../../components/Loading";

import * as apiUpload from "../../../api/upload";
import * as apiPost from "../../../api/post";
import { useUser } from "../../../context/UserContext";

import COLOR from "../../../constants/colors";
import { createFormData } from "../../../utils/upload";

const PostStoryScreen = ({ navigation }) => {
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();

  const [isImgButton, setIsImgButton] = useState(false);

  //#region handle image
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
        setPostImg(result.uri);
      }
    } catch (error) {
      alert("Error when picking image");
      console.log("Error when picking image ", error.message);
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
          setPostImg(result.uri);
        }
      }
    } catch (error) {
      alert("Error when taking photo");
      console.log("Error when taking photo", error.message);
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

  const uploadImage = async () => {
    if (!postImg) {
      // console.log("There no img change");
      return;
    }
    const data = createFormData(postImg);

    try {
      const res = await apiUpload.uploadStory(data);
      if (res) {
        // console.log("upload photo", res.data.data.avatar);
        return res.data.data.img;
      }
    } catch (error) {
      console.log("Error when upload img", error.message);
    }
  };

  //#endregion

  const submit = async () => {
    if (postText === null || postText === "") {
      alert("Nothing to share");
      return;
    }
    setLoading(true);
    let imageUrl;
    if (postImg) {
      imageUrl = await uploadImage();
    }

    const newPost = {
      postText,
      postImg: imageUrl ? imageUrl : null,
    };

    console.log("Post: ", newPost);

    apiPost
      .createPost(newPost)
      .then(() => {
        Toast.show({
          type: "success", // success, error, info
          text1: "Successfully post story to all 🎉",
          text2: ``,
          visibilityTime: 2500,
          onShow: () => {},
          onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          onPress: () => {},
        });
        navigation.navigate("Stories");
      })
      .catch((error) => {
        alert("Error when creating story ");
        console.log("Error when creating story ", error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // db.collection("stories")
    //   .add({
    //     user,
    //     postText: postText,
    //     photoUrl: imageUrl,
    //     postAt: new Date().toISOString(),
    //     likes: 0,
    //     comments: 0,
    //   })
    //   .then(() => {
    //     setLoading(false);
    //     setPostSuccessAlert(true);
    //     setPost(null);
    //     setStory({ ...story, currentlyPostStory: true });
    //     navigation.navigate("Stories");
    //   })
    //   .catch((error) => {
    //     alert("Something gets wrong when posting ", error.message);
    //   });
  };

  return (
    <View style={styles.center}>
      <ImageBackground
        source={require("../../../utils/resources/bg/postbg.jpg")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 10,
          resizeMode: "cover",
        }}
        imageStyle={{ opacity: 0.5 }}
      />

      <InputWrapper>
        <InputField
          placeholder={`What's on your mind?\n Tell us about your day`}
          multiline
          numberOfLines={4}
          maxLength={150}
          maxHeight={120}
          value={postText}
          onChangeText={(content) => setPostText(content)}
        />
        {postImg != null ? <AddImage source={{ uri: postImg }} /> : null}

        <MyFloatingButton
          // active={isActiveFloatingButton}
          position="bottomRight"
          onPress={submit}
        >
          {loading ? (
            <Loading size="small" noText />
          ) : (
            <Entypo name="plus" size={24} color={COLOR.white} />
          )}
        </MyFloatingButton>

        <MyFloatingButton
          active={isImgButton}
          onPress={() => {
            setIsImgButton((prev) => !prev);
          }}
          position="bottomLeft"
        >
          <FontAwesome name="photo" size={24} color={COLOR.white} />
          {/* optional */}
          <MyButton
            onPress={addPhotoFromCamera}
            disabled={loading}
            style={{ backgroundColor: COLOR.red }}
          >
            <Ionicons name="ios-camera" size={24} color={COLOR.white} />
          </MyButton>
          <MyButton
            onPress={addPhotoFromGallery}
            disabled={loading}
            style={{ backgroundColor: COLOR.lightBlue }}
          >
            <Ionicons name="images" size={24} color={COLOR.white} />
          </MyButton>
        </MyFloatingButton>
      </InputWrapper>
    </View>
  );
};

const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
  margin-bottom: 15px;
`;

const AddImage = styled.Image`
  width: 100%;
  height: 240px;
  margin-bottom: 15px;
  resize-mode: contain;
`;

const StatusWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: ${COLOR.whiteSmoke};
  border-radius: 5px;
  padding: 10px 25px;
  margin: 10px;
  width: 116px;
`;

const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${COLOR.green};
`;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default PostStoryScreen;
