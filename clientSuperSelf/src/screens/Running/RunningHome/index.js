import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import MyCard from "../../../components/MyCard/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RunningHomeScreen = ({ navigation }) => {
  const HeaderInfo = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={ICON.mapMobile}
          style={{
            width: WIDTH * 0.7,
            resizeMode: "contain",
            height: WIDTH * 0.8,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            paddingTop: 0,
          }}
        >
          <MyText size4 b6>
            YÊU CẦU QUYỀN LOCATION
          </MyText>
          <MyText center>
            Hy vọng bạn sẽ chấp nhận quyền truy cập Location cho App để thực
            hiện các chức năng của chúng tôi trong suốt quá trình chạy!
          </MyText>
        </View>
      </View>
    );
  };

  const OptionTimerRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Goal Running");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Goal Running
              </MyText>
              <MyText size5>
                {
                  "Chế độ tập luyện đo đạc theo plan đặt ra như thời gian chạy, quãng đường, số bước chân, được nhắc nhở khi hoàn thành."
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  const OptionPedometerRunning = () => {
    return (
      <TouchableOpacity style={{ padding: 12, marginTop: -16 }}>
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Pedometer
              </MyText>
              <MyText size5>
                {
                  "Chế độ auto đo đạc số bước chân của bạn tự động ngay cả khi bạn không sử dụng app! Chế độ xem theo ngày hiện tại!"
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  const OptionStatisticRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Run Charts");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Statistic Running
              </MyText>
              <MyText size5>
                {
                  "Charts thống kê hành vi, thói quen chạy bộ của bạn trong khoảng thời gian, và đưa ra lời khuyên hữu ích nhất cho bạn!"
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };
  const OptionRankingRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Rank");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Rank Running
              </MyText>
              <MyText size5>
                {
                  "Bảng xếp hạng thành tựu chạy bộ trong tuần/tháng qua của bạn so với thế giới hoặc với bạn bè của bạn."
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            backgroundColor: "white",
          }}
        >
          <HeaderInfo></HeaderInfo>
          <OptionRankingRunning></OptionRankingRunning>
          <OptionStatisticRunning></OptionStatisticRunning>
          <OptionTimerRunning></OptionTimerRunning>
          <OptionPedometerRunning></OptionPedometerRunning>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default RunningHomeScreen;
