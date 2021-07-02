import React, { useState, useEffect } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import PopupMusic from "./PopupMusic";
import { Audio } from "expo-av";

import ButtonControl from "./ButtonControl";
import { width } from "../../../constants/dimensions";

const formatStr = (str, number) => {
  if (str.length > number) return str.substring(0, number - 1) + "...";
  return str;
};

function CardMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  //#endregion
  const [isOpenPopup, setIsOpenPopup] = useState(true);
  const [urlMusic, setUrlMusic] = useState(
    "https://r6---sn-i3b7knl6.googlevideo.com/videoplayback?expire=1625222649&ei=mZneYMXrNoLy4gK0kabYAg&ip=103.138.88.45&id=o-AInBW8dVRgro-lYY-D-xSKyiNwbXZlNgl2DhzhWz6BHB&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video/mp4&ns=uencBHCnUNrDQ3v40U3S7rkG&gir=yes&clen=278307134&ratebypass=yes&dur=5410.133&lmt=1584387441742168&fexp=24001373,24007246&c=WEB&txp=5431432&n=-RsBnTB4MIpqO_&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,gir,clen,ratebypass,dur,lmt&sig=AOq0QJ8wRgIhAOtv5HBm-f2n7wNeVlr5avT4N0jUwBvAPKIRS2USD55hAiEA7-cbKWhLfD3CT_cJch6gSzPAMvbt6jkddEXXEFhd4co=&rm=sn-8qj-nbole7r,sn-npold7d&req_id=411f73f54225a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=Xv&mip=2402:800:6296:4f04:792c:fc8c:13dc:1167&mm=30&mn=sn-i3b7knl6&ms=nxu&mt=1625200498&mv=u&mvi=6&pl=51&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgJhb4fBxreq4EkxAAxfLbPBQBRrtc1cUMjN7ARkMoUVECIGeFjuVexOhkoPGY0nrz1WNqqtHcKwxuzovakyOVnK50"
  );

  const [nameMusic, setNameMusic] = useState("Brain Beat Relax or Study");
  const [kindMusic, setKindMusic] = useState("#Relax #Sleeping #Study");
  const [time, setTime] = useState("1:30:12");
  const [sound, setSound] = React.useState();

  async function playSound() {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        // require("../../../utils/resources/sound/soundBGWorld.mp3")
        {
          uri: "https://r6---sn-i3b7knl6.googlevideo.com/videoplayback?expire=1625222649&ei=mZneYMXrNoLy4gK0kabYAg&ip=103.138.88.45&id=o-AInBW8dVRgro-lYY-D-xSKyiNwbXZlNgl2DhzhWz6BHB&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video/mp4&ns=uencBHCnUNrDQ3v40U3S7rkG&gir=yes&clen=278307134&ratebypass=yes&dur=5410.133&lmt=1584387441742168&fexp=24001373,24007246&c=WEB&txp=5431432&n=-RsBnTB4MIpqO_&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,gir,clen,ratebypass,dur,lmt&sig=AOq0QJ8wRgIhAOtv5HBm-f2n7wNeVlr5avT4N0jUwBvAPKIRS2USD55hAiEA7-cbKWhLfD3CT_cJch6gSzPAMvbt6jkddEXXEFhd4co=&rm=sn-8qj-nbole7r,sn-npold7d&req_id=411f73f54225a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=Xv&mip=2402:800:6296:4f04:792c:fc8c:13dc:1167&mm=30&mn=sn-i3b7knl6&ms=nxu&mt=1625200498&mv=u&mvi=6&pl=51&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgJhb4fBxreq4EkxAAxfLbPBQBRrtc1cUMjN7ARkMoUVECIGeFjuVexOhkoPGY0nrz1WNqqtHcKwxuzovakyOVnK50",
        }
      );
      setSound(sound);
      await sound.playAsync();
    }
    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function playNewSound(url) {
    if (sound) await sound.unloadAsync();
    const { sound } = await Audio.Sound.createAsync({
      uri: url ?? urlMusic,
    });
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log("Pause Sound");
    if (sound) await sound.pauseAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <MyCard>
      <TouchableOpacity
        style={{
          margin: -12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: width * 0.8,
        }}
        onPress={() => {
          setIsOpenPopup(true);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ButtonControl
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playMusic={playSound}
            pauseMusic={pauseSound}
          />

          <View style={{ flexDirection: "column", marginLeft: 8 }}>
            <MyText size6 b5>
              {formatStr(nameMusic, 25)}
            </MyText>
            <MyText size6 b3i>
              {formatStr(kindMusic, 25)}
            </MyText>
          </View>
        </View>

        <View>
          <MyText size6>{time}</MyText>
        </View>
      </TouchableOpacity>

      <PopupMusic
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        setUrlMusic={setUrlMusic}
        playNewSound={playNewSound}
        setKindMusic={setKindMusic}
        setNameMusic={setNameMusic}
        setTime={setTime}
      ></PopupMusic>
    </MyCard>
  );
}

export default CardMusic;
