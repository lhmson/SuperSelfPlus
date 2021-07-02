import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import ImageView from "react-native-image-viewing";

import MyText from "../../../components/MyText";
import ProgressiveImage from "../../../components/ProgressiveImage";
import COLOR from "../../../constants/colors";
import { useUser } from "../../../context/UserContext";
import { shareStory } from "../../../utils/share";

const FooterImage = (props) => {
  return (
    <View style={styles.footer}>
      <MyText medium color={COLOR.white}>
        {props.item.postText}
      </MyText>
    </View>
  );
};

const StoryItem = ({ item, navigation }) => {
  const user = useUser();
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
  };

  const deleteStory = () => {};

  const images = useMemo(
    () => [
      {
        uri: item.postImg,
      },
    ],
    []
  );
  const [imgVisible, setImgVisible] = useState(false);
  console.log(item);

  return (
    <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto
          source={
            item.userId.avatarUrl === "default"
              ? require("../../../utils/resources/superself-logo.png")
              : { uri: item.userId.avatarUrl }
          }
        />
        <PostInfoContainer>
          <TouchableOpacity onPress={() => {}}>
            <MyText size4>{item.userId.username}</MyText>
          </TouchableOpacity>
          <MyText size5 color={COLOR.grey}>
            {moment(item.createdAt).format("MMM Do YYYY h:mm:ss")},{" "}
            {moment(item.createdAt).fromNow()}
          </MyText>
        </PostInfoContainer>
        {/* <MoreOption onPress={() => reportStory()}>
          <MaterialIcons name="report" size={24} color={COLOR.grey} />
        </MoreOption> */}
      </PostHeaderContainer>
      <Post>
        <MyText>{item.postText}</MyText>
        {item.postImg && (
          <>
            <TouchableOpacity
              onPress={() => {
                setImgVisible(true);
              }}
            >
              <ProgressiveImage
                defaultImgSrc={require("../../../utils/resources/defaultimage.png")}
                source={{ uri: item.postImg }}
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 6,
                  marginTop: 15,
                  marginBottom: 15,
                }}
                resizeMode="cover"
              />
              {/* <PostPhoto source={{ uri: item.postImg }} /> */}
            </TouchableOpacity>
            <ImageView
              images={images}
              imageIndex={0}
              animationType="fade"
              visible={imgVisible}
              onRequestClose={() => setImgVisible(false)}
              FooterComponent={(currentImg) => <FooterImage item={item} />}
            />
          </>
        )}
        <PostDetails style={{ alignItems: "center" }}>
          <PostLikes onPress={toggleLike}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={COLOR.green}
            />
            <MyText size5 style={{ paddingLeft: 6 }}>
              {item.listUserLikes?.length ?? 0}
            </MyText>
          </PostLikes>
          {/* <PostAction onPress={() => navigation.navigate("Message")}>
            <AntDesign name="message1" size={24} color={COLOR.green} />
            <MyText size5 style={{ paddingLeft: 6 }}>
              Message
            </MyText>
          </PostAction> */}
          <PostAction onPress={() => shareStory(item)}>
            <FontAwesome name="share" size={24} color={COLOR.blue} />
            <MyText size5 style={{ paddingLeft: 6 }}>
              Share
            </MyText>
          </PostAction>
          {user.state.uid === item.userId._id ? (
            <PostAction onPress={() => deleteStory()}>
              <FontAwesome name="trash" size={24} color={COLOR.orange} />
              <MyText size5 style={{ paddingLeft: 6 }}>
                Delete
              </MyText>
            </PostAction>
          ) : null}
        </PostDetails>
      </Post>
    </PostContainer>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${COLOR.whiteSmoke};
  ${"" /* padding-top: 25px; */}
  padding-bottom: 50px;
`;

const FeedContainer = styled.View`
  ${
    "" /* padding-bottom: 15%;
  background-color: ${COLOR.yellow}; */
  }
`;

const PostContainer = styled.View`
  margin: 16px 16px 0px 16px;
  background-color: ${COLOR.white};
  border-radius: 5px;
  padding: 10px;
`;

const PostHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PostProfilePhoto = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const PostInfoContainer = styled.View`
  flex: 1;
  margin: 0 15px;
`;

const Post = styled.View`
  margin: 10px 10px 0 10px;
`;

const PostPhoto = styled.Image`
  width: 100%;
  height: 240px;
  border-radius: 6px;
  margin: 15px 0;
  resize-mode: contain;
`;

const PostDetails = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  margin-top: 10px;
  border-top-color: ${COLOR.grey};
  border-top-width: 0.5px;
  ${
    "" /* border-bottom-color: ${COLOR.black};
  border-bottom-width: 1px; */
  }
`;

const PostLikes = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostShare = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostAction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const StatusBar = styled.StatusBar``;

const MoreOption = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Feed = styled.FlatList`
  margin: 5px 0;
`;

const SelfArea = styled.View`
  margin: 16px 16px 0 16px;
  background-color: ${COLOR.white};
  border-radius: 5px;
  padding: 10px;
  ${
    "" /* flex-direction: row;
  justify-content: space-between; */
  }
  align-items: center;
`;

const SelfButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  footer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLOR.whiteSmoke,
    // paddingHorizontal: 10,
    paddingVertical: 50,
  },
});

export default StoryItem;
