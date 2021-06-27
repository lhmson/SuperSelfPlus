import React, { useContext, useState } from "react";
import {
  View,
  Alert,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import MyButton from "../../../components/MyButton";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { useUser } from "../../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyCard from "../../../components/MyCard";
import { Title } from "native-base";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
} from "victory-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function ProfileScreen() {
  // const [user, setUser] = useContext(UserContext);

  const user = useUser();
  const { updateUser } = user;

  const handleLogOut = async () => {
    Alert.alert(
      "Confirm your action",
      "You wanna logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // const loggedOut = await User.logOut();
            // if (loggedOut) {
            //   setUser((state) => ({ ...state, isLoggedIn: false }));
            // }
            try {
              await AsyncStorage.removeItem("superself_token").then(() =>
                updateUser({ isLoggedIn: false })
              );
            } catch (error) {
              alert("Error log out");
              console.log("Error log out", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const LogOutButton = () => {
    return (
      <MyButton onPress={handleLogOut} color={COLOR.green}>
        <MyText b5 color="white">
          Logout
        </MyText>
      </MyButton>
    );
  };

  const Avatar = () => {
    return (
      <View
        style={{
          zIndex: 100,
          position: "absolute",
          top: -50,
          left: 16,
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/aa/18/a9/aa18a9a63f2a6316b4c9d8406f97f55e.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        ></Image>
      </View>
    );
  };

  const Infomation = () => {
    const _WidthCard = (WIDTH - 180) / 3;
    const CardInfo = ({ title, number, unit }) => {
      return (
        <MyCard>
          <View
            style={{
              flexDirection: "column",
              width: _WidthCard,
              justifyContent: "center",
              alignItems: "center",
              margin: -6,
            }}
          >
            <MyText size5 b7 color={COLOR.green}>
              {title}
            </MyText>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <MyText size4 b5>
                {number}
              </MyText>
              <MyText size5 color="grey">
                {unit}
              </MyText>
            </View>
          </View>
        </MyCard>
      );
    };
    return (
      <View
        style={{
          flexDirection: "column",
          marginTop: 32,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <MyText size4 b6>
              Bella Poarch
            </MyText>
            <MyText custom1 b4 color={COLOR.green}>
              Basic Member
            </MyText>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyButton color={COLOR.lightGreen}>
              <MyText size6 b5 color={COLOR.white}>
                Edit
              </MyText>
            </MyButton>
          </View>
        </View>
        <MyText color="grey" left custom1 b2i>
          I decide I was going to actively pursue a better life, and take better
          care of my mind, body and soul!
        </MyText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CardInfo title="WEIGHT" number={65} unit="kg"></CardInfo>
          <CardInfo title="AGE" number={21} unit="yo"></CardInfo>
          <CardInfo title="HEIGHT" number={167} unit="cm"></CardInfo>
        </View>
      </View>
    );
  };

  const MyBadges = () => {
    const dataBadges = [
      {
        iconBadges:
          "https://i.pinimg.com/564x/76/5e/a5/765ea5eab7bf44f786056452838111e5.jpg",
        title: "Nutrition Expert",
        description: "Hit all daily Goals",
      },
      {
        iconBadges:
          "https://i.pinimg.com/564x/67/bf/2e/67bf2e2c104278d349fa88fb5ea7e9a5.jpg",
        title: "Yoga Master",
        description: "Completed event",
      },
      {
        iconBadges:
          "https://i.pinimg.com/564x/f9/c8/f0/f9c8f0efa8583b52484988d80a33662b.jpg",
        title: "Walk enduring",
        description: "Walk 20.000 a day",
      },
      {
        iconBadges:
          "https://i.pinimg.com/564x/76/5e/a5/765ea5eab7bf44f786056452838111e5.jpg",
        title: "Nutrition Expert",
        description: "Hit all daily Goals",
      },
    ];
    const CardBadge = ({ iconBadges, title, description }) => {
      return (
        <MyCard>
          <View
            style={{
              width: WIDTH - 120,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: iconBadges }}
              style={{ width: 50, height: 50, resizeMode: "cover" }}
            ></Image>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginLeft: 8,
              }}
            >
              <MyText custom1 b7>
                {title}
              </MyText>
              <MyText size6 color="grey">
                {description}
              </MyText>
            </View>
          </View>
        </MyCard>
      );
    };
    return (
      <View>
        <MyText b7>My badges</MyText>
        <MyCard color={COLOR.whiteSmoke}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {dataBadges.map((item, index) => (
              <CardBadge
                key={index}
                title={item.title}
                description={item.description}
                iconBadges={item.iconBadges}
              ></CardBadge>
            ))}
            <TouchableOpacity>
              <MyText color={COLOR.green} b5 size5>
                See more
              </MyText>
            </TouchableOpacity>
          </View>
        </MyCard>
      </View>
    );
  };

  const MyChart = () => {
    return (
      <MyCard style={{ justifyContent: "center", flexDirection: "column" }}>
        <VictoryChart
          polar
          theme={VictoryTheme.material}
          animate={{
            duration: 2000,
            easing: "circleIn",
          }}
        >
          {["Health", "Run", "Mentality", "Relax", "Community"].map((d, i) => {
            return (
              <VictoryPolarAxis
                dependentAxis
                key={i}
                label={d}
                labelPlacement="perpendicular"
                style={{
                  tickLabels: { fill: "none" },
                  axis: { stroke: COLOR.lightGreen },
                  axisLabel: { color: COLOR.green },
                }}
                axisValue={d}
              />
            );
          })}
          <VictoryBar
            style={{ data: { fill: COLOR.green, width: 25 } }}
            data={[
              { x: "Health", y: 34 },
              { x: "Run", y: 25 },
              { x: "Mentality", y: 40 },
              { x: "Relax", y: 50 },
              { x: "Community", y: 50 },
            ]}
          />
        </VictoryChart>
        <MyText size5 b6i color="grey">
          User behavior assessment table
        </MyText>
      </MyCard>
    );
  };

  const BackgroundCardInfo = () => {
    return (
      <View
        style={{
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Image
          source={{
            uri: "https://scontent.xx.fbcdn.net/v/t1.15752-0/p403x403/206235929_177553944257561_2968455633930872281_n.png?_nc_cat=109&ccb=1-3&_nc_sid=aee45a&_nc_ohc=L1FJ5UQWBP0AX8a7Abv&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&tp=30&oh=9064158ea8d3bbdab99e8dd44022391e&oe=60DBECBB",
          }}
          style={{
            width: WIDTH,
            height: WIDTH * 0.7,
            resizeMode: "cover",
            borderRadius: 30,
          }}
        ></Image>
      </View>
    );
  };
  const Background = () => {
    return (
      <View
        style={{
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: -12,
        }}
      >
        <Image
          source={{
            uri: "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.15752-9/207018674_283811080193820_4375351581965609644_n.png?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_ohc=RIX8pvbtgpwAX_WjYsy&_nc_ht=scontent.fdad3-3.fna&oh=406292b5e31526f7f43e7d32f781d672&oe=60DCADB4",
          }}
          style={{
            width: WIDTH + 10,
            height: WIDTH * 0.3,
            resizeMode: "cover",
          }}
        ></Image>
      </View>
    );
  };
  const CardProfile = () => {
    return (
      <View
        style={{
          width: WIDTH,
          padding: 16,
          backgroundColor: "white",
          borderRadius: 32,
          elevation: 20,
          marginTop: 72,
          marginBottom: 48,
          flex: 1,
        }}
      >
        <Avatar></Avatar>
        <BackgroundCardInfo></BackgroundCardInfo>
        <Infomation></Infomation>
        <MyBadges></MyBadges>
        <MyChart></MyChart>
        <LogOutButton></LogOutButton>
        <View style={{ height: 48 }}></View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Background></Background>
      <CardProfile></CardProfile>
    </ScrollView>
  );
}

export default ProfileScreen;
