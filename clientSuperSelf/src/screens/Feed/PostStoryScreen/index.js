import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import styled from "styled-components";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import ActionButton from "react-native-circular-action-menu";

import MyButton from "../../../components/MyButton";
import MyFloatingButton from "../../../components/MyFloatingButton";
import Loading from "../../../components/Loading";

import COLOR from "../../../constants/colors";

const PostStoryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();

  const [isImgButton, setIsImgButton] = useState(false);

  //#region handle image
  const getPermissions = async () => {};

  const pickImageFromGallery = async () => {};

  const pickImageFromCamera = async () => {};

  const addPhotoFromGallery = async () => {};

  const addPhotoFromCamera = async () => {};

  const uploadImage = async () => {};

  //#endregion

  const submit = async () => {};

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
          onChangeText={(content) => setPost(content)}
        />
        {postImg != null ? <AddImage source={{ uri: postImg }} /> : null}

        <MyFloatingButton
          // active={isActiveFloatingButton}
          position="bottomRight"
          onPress={submit}
        >
          <Entypo name="plus" size={24} color={COLOR.white} />
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
        {/* <ActionButton
          buttonColor={COLOR.orange}
          size={56}
          style={styles.actionButton}
          degrees={160}
          position="left"
          icon={
            <Ionicons
              name="ios-images"
              style={{ color: COLOR.green, fontSize: 20 }}
            ></Ionicons>
          }
        >
          <ActionButton.Item
            buttonColor={COLOR.blue}
            title="Take Photo"
            onPress={addPhotoFromCamera}
            endDegree={360}
          >
            <Ionicons name="ios-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={COLOR.blue}
            title="Choose Photo"
            onPress={addPhotoFromGallery}
            endDegree={360}
          >
            <Ionicons name="md-images" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> */}

        {/* <View style={{ flexDirection: "row" }}>
          {loading ? <Loading /> : null}
          <SCLAlert
            headerIconComponent={
              <Image
                source={require("../utils/Icon/input.png")}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
            }
            theme="warning"
            show={noPostAlert}
            onRequestClose={() => setNoPostAlert(false)}
            title="Input something..."
            subtitle="You haven't put in a content for your story"
          >
            <SCLAlertButton
              theme="success"
              onPress={() => {
                setNoPostAlert(false);
              }}
            >
              Back to edit
            </SCLAlertButton>
          </SCLAlert>

          <SCLAlert
            headerIconComponent={
              <Image
                source={require("../utils/Icon/success.png")}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
            }
            theme="warning"
            show={postSuccessAlert}
            title="Upload successfully"
            subtitle="Your story has been posted"
            onRequestClose={() => setPostSuccessAlert(false)}
          >
            <SCLAlertButton
              theme="success"
              onPress={() => {
                setPostSuccessAlert(false);
              }}
            >
              OK
            </SCLAlertButton>
          </SCLAlert>
        </View> */}
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
