import React from "react";
import { Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
var IMAGES_PER_ROW = 4;

const calculatedSize = () => {
  var size = windowWidth / IMAGES_PER_ROW;
  return { width: size, height: size };
};

const urls = [
  "https://firebasestorage.googleapis.com/v0/b/superselftest-d1ccf.appspot.com/o/defaultimg%2Fsuperself-icon.png?alt=media&token=3fceeba3-cdb8-4547-9cd9-d038fde6fdf1",
  "https://i.ibb.co/kxWbgjh/035-travel.png",
  "https://i.ibb.co/C2BwqCC/034-toy.png",
  "https://i.ibb.co/hdT62r6/033-massage.png",
  "https://i.ibb.co/3FyFwfT/032-snack.png",
  "https://i.ibb.co/4JHSVP2/031-shopping-cart.png",
  "https://i.ibb.co/f2mR0sH/030-salon.png",
  "https://i.ibb.co/s2zWxpd/029-public-transport.png",
  "https://i.ibb.co/ft81psm/028-parking.png",
  "https://i.ibb.co/3m63bxz/027-music.png",
  "https://i.ibb.co/yY3mspz/026-movie.png",
  "https://i.ibb.co/bzMHx44/024-medical.png",
  "https://i.ibb.co/vskYM9J/022-laundry.png",
  "https://i.ibb.co/7W0fNQM/018-painting.png",
  "https://i.ibb.co/ts28mKh/017-gym.png",
  "https://i.ibb.co/Bczz8V6/016-groceries.png",
  "https://i.ibb.co/z5wHGZ4/015-gift.png",
  "https://i.ibb.co/fX6QMcg/013-fruit.png",
  "https://i.ibb.co/n09VSZJ/007-drink.png",
  "https://i.ibb.co/0yjFty0/001-book.png",
  "https://i.ibb.co/YPrr889/010-fast-food.png",
  "https://i.ibb.co/ysLTVRB/014-gas.png",
];

export default iconsUrl = [
  {
    url: urls[0],
    img: <Image style={calculatedSize()} source={{ uri: urls[0] }} />,
  },
  {
    url: urls[1],
    img: <Image style={calculatedSize()} source={{ uri: urls[1] }} />,
  },
  {
    url: urls[2],
    img: <Image style={calculatedSize()} source={{ uri: urls[2] }} />,
  },
  {
    url: urls[3],
    img: <Image style={calculatedSize()} source={{ uri: urls[3] }} />,
  },
  {
    url: urls[4],
    img: <Image style={calculatedSize()} source={{ uri: urls[4] }} />,
  },
  {
    url: urls[5],
    img: <Image style={calculatedSize()} source={{ uri: urls[5] }} />,
  },
  {
    url: urls[6],
    img: <Image style={calculatedSize()} source={{ uri: urls[6] }} />,
  },
  {
    url: urls[7],
    img: <Image style={calculatedSize()} source={{ uri: urls[7] }} />,
  },
  {
    url: urls[8],
    img: <Image style={calculatedSize()} source={{ uri: urls[8] }} />,
  },
  {
    url: urls[9],
    img: <Image style={calculatedSize()} source={{ uri: urls[9] }} />,
  },
  {
    url: urls[10],
    img: <Image style={calculatedSize()} source={{ uri: urls[10] }} />,
  },
  {
    url: urls[11],
    img: <Image style={calculatedSize()} source={{ uri: urls[11] }} />,
  },
  {
    url: urls[12],
    img: <Image style={calculatedSize()} source={{ uri: urls[12] }} />,
  },
  {
    url: urls[13],
    img: <Image style={calculatedSize()} source={{ uri: urls[13] }} />,
  },
  {
    url: urls[14],
    img: <Image style={calculatedSize()} source={{ uri: urls[14] }} />,
  },
  {
    url: urls[15],
    img: <Image style={calculatedSize()} source={{ uri: urls[15] }} />,
  },
  {
    url: urls[16],
    img: <Image style={calculatedSize()} source={{ uri: urls[16] }} />,
  },
  {
    url: urls[17],
    img: <Image style={calculatedSize()} source={{ uri: urls[17] }} />,
  },
  {
    url: urls[18],
    img: <Image style={calculatedSize()} source={{ uri: urls[18] }} />,
  },
  {
    url: urls[19],
    img: <Image style={calculatedSize()} source={{ uri: urls[19] }} />,
  },
  {
    url: urls[20],
    img: <Image style={calculatedSize()} source={{ uri: urls[20] }} />,
  },
  {
    url: urls[21],
    img: <Image style={calculatedSize()} source={{ uri: urls[21] }} />,
  },
];
