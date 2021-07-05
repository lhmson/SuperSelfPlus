import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import styled from "styled-components";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

import ImageView from "react-native-image-viewing";
import Toast from "react-native-toast-message";

import MyText from "../../../components/MyText";
import ProgressiveImage from "../../../components/ProgressiveImage";
import COLOR from "../../../constants/colors";

import * as apiPost from "../../../api/post";
import { useUser } from "../../../context/UserContext";
import { shareStory } from "../../../utils/share";
import { logoUrl } from "../../../utils/logo";

const FooterImage = (props) => {
  return (
    <View style={styles.footer}>
      <MyText medium color={COLOR.white}>
        {props.item.text}
      </MyText>
    </View>
  );
};

const ArticleItem = ({ item, setIsChanged, navigation }) => {
  const user = useUser();
  const [isLiked, setIsLiked] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item?.listUserLikes?.find((item) => item === user.state.uid)) {
      setIsLiked(true);
    }
  }, []);

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    apiPost
      .likePost(item._id)
      .then(() => {
        setIsChanged(true);
      })
      .catch((error) => {
        console.log("Error when like post", error.message);
        alert("Error when act with post");
      });
  };

  const readmore = () => {
    navigation.navigate("Article Detail", { item: item });
  };

  const images = useMemo(
    () => [
      {
        uri: item.postImg,
      },
    ],
    []
  );
  const [imgVisible, setImgVisible] = useState(false);

  return (
    <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto source={{ uri: item?.category?.photoUrl }} />
        <PostInfoContainer
          onPress={() => {
            // navigation.navigate("SuperSelf Topic", { item: item });
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <MyText>{item.category.name}</MyText>
          </TouchableOpacity>
        </PostInfoContainer>
        <MoreOption onPress={() => readmore()}>
          <MyText size5>{item?.text.split(" ").length} words</MyText>
          <MaterialIcons name="more" size={24} color={COLOR.grey} />
        </MoreOption>
      </PostHeaderContainer>
      <Post>
        <MyText>{item?.title}</MyText>
        <TouchableOpacity onPress={() => Linking.openURL(item?.author?.link)}>
          <MyText right size5 b6>
            by {item?.author?.name}
          </MyText>
        </TouchableOpacity>

        <MyText size5 b3 style={{ textAlign: "left", marginTop: 16 }}>
          {item?.text?.substring(0, 200).replace(/  /g, "\n\n")}
          ...
        </MyText>
        <TouchableOpacity
          onPress={() => {
            readmore();
          }}
        >
          <MyText color={COLOR.blue} style={{ marginTop: 18 }}>
            Click here to continue
          </MyText>
        </TouchableOpacity>

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
              // FooterComponent={(currentImg) => <FooterImage item={item} />}
            />
          </>
        )}
        <PostDetails style={{ alignItems: "center" }}>
          <PostAction disabled={loading} onPress={toggleLike}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={COLOR.green}
            />
            <MyText size5 style={{ paddingLeft: 6 }}>
              {item?.listUserLikes?.length ?? 0}
            </MyText>
          </PostAction>

          <PostAction disabled={loading} onPress={() => shareStory(item)}>
            <FontAwesome name="share" size={24} color={COLOR.blue} />
            <MyText size5 style={{ paddingLeft: 6 }}>
              Share
            </MyText>
          </PostAction>
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

const PostAction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const StatusBar = styled.StatusBar``;

const MoreOption = styled.TouchableOpacity`
  margin-right: 10px;
  align-items: flex-end;
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

export default ArticleItem;
