import quotes from "./quotes";
import { Alert } from "react-native";

export default generateDayQuote = () => {
  const item = quotes[Math.floor(Math.random() * quotes.length)];
  const quote = item.quoteText;
  const author = item.quoteAuthor;
  Alert.alert(
    "Everyday's Quotes:",
    `${quote}\n- ${author || "Unknown"}`,
    [
      {
        text: "Share it",
        onPress: () => console.log("Share pressed"),
      },
      {
        text: "Cancel",
        // onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Next",
        onPress: () => {
          generateDayQuote();
          // console.log("Next quote Pressed");
        },
      },
    ],
    { cancelable: false }
  );
};
