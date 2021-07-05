import React, { useState, useContext } from "react";
import styled from "styled-components";
import { View, Linking, ScrollView, TouchableOpacity } from "react-native";
import ImageView from "react-native-image-viewing";
import ProgressiveImage from "../../../components/ProgressiveImage";
import COLOR from "../../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

import MyText from "../../../components/MyText";

import { useUser } from "../../../context/UserContext";

const ArticleDetail = (props) => {
  const { item } = props.route.params;
  console.log(item);
  const user = useUser();

  const images = [
    {
      uri: item.postImg,
    },
  ];
  const [imgVisible, setImgVisible] = useState(false);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ paddingBottom: 50 }}>
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
            </TouchableOpacity>
            <ImageView
              images={images}
              imageIndex={0}
              animationType="fade"
              visible={imgVisible}
              onRequestClose={() => setImgVisible(false)}
            />
          </>
        )}
        <View>
          <MyText size4>{item?.title}</MyText>
          <TouchableOpacity onPress={() => Linking.openURL(item?.author?.link)}>
            <MyText size5 b6 right style={{ marginVertical: 18 }}>
              by {item?.author?.name}
            </MyText>
          </TouchableOpacity>

          <MyText size5 left>
            {item?.text?.replace(/  /g, "\n\n")}
          </MyText>
        </View>
      </View>
    </ScrollView>
  );
};

export default ArticleDetail;
