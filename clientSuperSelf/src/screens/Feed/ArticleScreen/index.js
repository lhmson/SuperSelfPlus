import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Foundation } from "@expo/vector-icons";

import MyText from "../../../components/MyText";
import FooterList from "../../../components/FooterList";
import SkeletonSample from "../../../components/SkeletonSample";
import ProgressiveImage from "../../../components/ProgressiveImage";
import COLOR from "../../../constants/colors";
import Toast from "react-native-toast-message";

import ArticleItem from "./ArticleItem";
import { logoUrl } from "../../../utils/logo";
import { useIsFocused } from "@react-navigation/native";

import * as apiPost from "../../../api/post";
import { articles } from "./data";

const ArticleScreen = ({ navigation }) => {
  const renderStory = ({ item }) => {
    return (
      <ArticleItem
        item={item}
        setIsChanged={setIsChanged}
        navigation={navigation}
      />
    );
  };

  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const [isChanged, setIsChanged] = useState(false);

  const [listArticles, setListArticles] = useState([
    // {
    //   userId: {
    //     avatarUrl: logoUrl,
    //     username: "admin",
    //   },
    //   postImg:
    //     "https://upload.wikimedia.org/wikipedia/commons/5/5e/Landscape_reflection_in_Dal_Lake%2C_Srinagar%2C_Kashmir%2C_India.jpg",
    //   postText: "some info",
    // },
  ]);

  useEffect(
    () => {
      setListArticles(articles);
      setTimeout(() => setLoading(false), 1500);
      // apiPost
      //   .fetchPosts()
      //   .then((res) => {
      //     setListStory(res.data);
      //   })
      //   .catch((error) => {
      //     alert("Error when get story");
      //     console.log("Error when get stories", error.message);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
      // setIsChanged(false);
    },
    [
      // isChanged,
      // isFocused
    ]
  );

  return (
    <Container>
      {/* <SelfArea>
        <SelfButton
          onPress={() => {
            navigation.navigate("Post Story");
          }}
        >
          <Foundation name="folder-add" size={24} color={COLOR.green} />
          <MyText bold>Add your own story</MyText>
        </SelfButton>
      </SelfArea> */}

      <FeedContainer>
        {loading ? (
          <SkeletonSample />
        ) : (
          <Feed
            data={listArticles ? listArticles : []}
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
`;

const FeedContainer = styled.View`
  /* margin-bottom: 50px; */

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
    // backgroundColor: COLOR.whiteSmoke,
    // paddingHorizontal: 10,
    paddingVertical: 50,
  },
});

export default ArticleScreen;
