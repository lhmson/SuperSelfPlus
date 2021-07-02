import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";
import {
  Foundation,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import ImageView from "react-native-image-viewing";

import MyText from "../../../components/MyText";
import FooterList from "../../../components/FooterList";
import SkeletonSample from "../../../components/SkeletonSample";
import ProgressiveImage from "../../../components/ProgressiveImage";
import COLOR from "../../../constants/colors";

const FooterImage = (props) => {
  return (
    <View style={styles.footer}>
      <MyText medium color={`${COLOR.white}`}>
        {props.item.post}
      </MyText>
    </View>
  );
};

const StoryItem = ({ item, onDelete, navigation }) => {
  return (
    <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto
          source={
            item.user.profilePhotoUrl === "default"
              ? require("../../../utils/resources/superself-logo.png")
              : { uri: item.user.profilePhotoUrl }
          }
        />
        <PostInfoContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User Profile", { item: item });
            }}
          >
            <MyText condense medium>
              {item.user.username}
            </MyText>
          </TouchableOpacity>
          <MyText tiny color={`${COLOR.lightBlack}`} margin="5px 0 0 0">
            {moment(item.postAt).format("MMM Do YYYY h:mm:ss")},{" "}
            {moment(item.postAt).fromNow()}
          </MyText>
        </PostInfoContainer>
        <MoreOption onPress={() => reportStory()}>
          <MaterialIcons
            name="report"
            size={24}
            color={`${COLOR.primaryDark}`}
          />
        </MoreOption>
      </PostHeaderContainer>
      <Post>
        <MyText style={{ lineHeight: 20 }}>{item.post}</MyText>
        {item.photoUrl && (
          <>
            <TouchableOpacity
              onPress={() => {
                setImgVisible(true);
              }}
            >
              <ProgressiveImage
                defaultImgSrc={require("../../../utils/resources/defaultimage.png")}
                source={{ uri: item.photoUrl }}
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 6,
                  marginTop: 15,
                  marginBottom: 15,
                }}
                resizeMode="cover"
              />
              {/* <PostPhoto source={{ uri: item.photoUrl }} /> */}
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
          {/* <PostLikes onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "ios-heart" : "ios-heart-empty"}
              size={24}
              color={`${COLOR.secondary}`}
            />
            <MyText small margin="0 0 0 6px">
              {item.likes}
            </MyText>
          </PostLikes> */}
          <PostMessage onPress={() => navigation.navigate("Message")}>
            <AntDesign name="message1" size={24} color={`${COLOR.primary}`} />
            <MyText small margin="0 0 0 6px">
              Message
            </MyText>
          </PostMessage>
          <PostShare onPress={() => shareStory()}>
            <FontAwesome name="share" size={24} color={`${COLOR.primary}`} />
            <MyText small margin="0 0 0 6px">
              Share
            </MyText>
          </PostShare>
          {user.uid === item.user.userId ? (
            <PostDelete onPress={() => deleteStory()}>
              <FontAwesome
                name="trash"
                size={24}
                color={`${COLOR.secondary}`}
              />
              <MyText small margin="0 0 0 6px">
                Delete
              </MyText>
            </PostDelete>
          ) : null}
        </PostDetails>
      </Post>
    </PostContainer>
  );
};

const StoryScreen = ({ navigation }) => {
  const renderStory = ({ item }) => {
    return (
      <StoryItem item={item} onDelete={handleDelete} navigation={navigation} />
    );
  };

  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <SelfArea>
        <SelfButton
          onPress={() => {
            navigation.navigate("Post Story");
          }}
        >
          <Foundation name="folder-add" size={24} color={`${COLOR.primary}`} />
          <MyText bold>Add your own story</MyText>
        </SelfButton>
      </SelfArea>

      <FeedContainer>
        {loading ? (
          <SkeletonSample />
        ) : (
          <Feed
            data={list ? list : []}
            renderItem={renderStory}
            keyExtractor={(item, index) => index.toString()}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={1200} // Increase time between renders
            windowSize={7} // Reduce the window size
            ListFooterComponent={() => (
              <FooterList title={"Discover the world now"} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* <StatusBar barStyle="dark-content" /> */}
      </FeedContainer>
    </Container>
  );
  //   <View style={styles.center}>
  //     {/* <StatusBar translucent backgroundColor="transparent" /> */}
  //     <MyText>This is the home screen</MyText>
  //     <Button
  //       title="Go to Todo Screen"
  //       onPress={() => navigation.navigate("Todo")}
  //     />
  //   </View>
  // );
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
  background-color: ${COLOR.skin}; */
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
  border-top-color: ${COLOR.lightBlack};
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

const PostMessage = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostDelete = styled.TouchableOpacity`
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
    // backgroundColor: COLOR.paleWhite,
    // paddingHorizontal: 10,
    paddingVertical: 50,
  },
});

export default StoryScreen;
