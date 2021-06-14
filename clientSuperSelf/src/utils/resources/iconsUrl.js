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
  "https://i.ibb.co/0yjFty0/001-book.png",
  "https://i.ibb.co/vcNJKnt/004-cloth.png",
  "https://i.ibb.co/VqBcqSm/005-coffee.png",
  "https://i.ibb.co/n09VSZJ/007-drink.png",
  "https://i.ibb.co/7xfHzHv/009-entertainment.png",
  "https://i.ibb.co/YPrr889/010-fast-food.png",
  "https://i.ibb.co/DGSn4PQ/012-food.png",
  "https://i.ibb.co/fX6QMcg/013-fruit.png",
  "https://i.ibb.co/ysLTVRB/014-gas.png",
  "https://i.ibb.co/z5wHGZ4/015-gift.png",
  "https://i.ibb.co/Bczz8V6/016-groceries.png",
  "https://i.ibb.co/ts28mKh/017-gym.png",
  "https://i.ibb.co/7W0fNQM/018-painting.png",
  "https://i.ibb.co/vskYM9J/022-laundry.png",
  "https://i.ibb.co/n3K7b9T/023-magazine.png",
  "https://i.ibb.co/bzMHx44/024-medical.png",
  "https://i.ibb.co/yY3mspz/026-movie.png",
  "https://i.ibb.co/3m63bxz/027-music.png",
  "https://i.ibb.co/ft81psm/028-parking.png",
  "https://i.ibb.co/s2zWxpd/029-public-transport.png",
  "https://i.ibb.co/f2mR0sH/030-salon.png",
  "https://i.ibb.co/4JHSVP2/031-shopping-cart.png",
  "https://i.ibb.co/3FyFwfT/032-snack.png",
  "https://i.ibb.co/hdT62r6/033-massage.png",
  "https://i.ibb.co/C2BwqCC/034-toy.png",
  "https://i.ibb.co/kxWbgjh/035-travel.png",
  // money
  "https://ibb.co/zrN7KyD",
  "https://ibb.co/VVGHKSK",
  "https://ibb.co/sPT16Wf",
  "https://ibb.co/DGVJDfn",
  "https://ibb.co/n1gzZ0Q",
  "https://ibb.co/ypbx9k8",
  "https://ibb.co/qnqLHkL",
  "https://ibb.co/jDwpkh4",
  "https://ibb.co/TBWcyHL",
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
  {
    url: urls[22],
    img: <Image style={calculatedSize()} source={{ uri: urls[22] }} />,
  },
  {
    url: urls[23],
    img: <Image style={calculatedSize()} source={{ uri: urls[23] }} />,
  },
  {
    url: urls[24],
    img: <Image style={calculatedSize()} source={{ uri: urls[24] }} />,
  },
  {
    url: urls[25],
    img: <Image style={calculatedSize()} source={{ uri: urls[25] }} />,
  },
  {
    url: urls[26],
    img: <Image style={calculatedSize()} source={{ uri: urls[26] }} />,
  },
  // money
  {
    url: urls[27],
    img: <Image style={calculatedSize()} source={{ uri: urls[27] }} />,
  },
  {
    url: urls[28],
    img: <Image style={calculatedSize()} source={{ uri: urls[28] }} />,
  },
  {
    url: urls[29],
    img: <Image style={calculatedSize()} source={{ uri: urls[29] }} />,
  },
  {
    url: urls[30],
    img: <Image style={calculatedSize()} source={{ uri: urls[30] }} />,
  },
  {
    url: urls[31],
    img: <Image style={calculatedSize()} source={{ uri: urls[31] }} />,
  },
  {
    url: urls[32],
    img: <Image style={calculatedSize()} source={{ uri: urls[32] }} />,
  },
  {
    url: urls[33],
    img: <Image style={calculatedSize()} source={{ uri: urls[33] }} />,
  },
  {
    url: urls[34],
    img: <Image style={calculatedSize()} source={{ uri: urls[34] }} />,
  },
  {
    url: urls[35],
    img: <Image style={calculatedSize()} source={{ uri: urls[35] }} />,
  },
];
