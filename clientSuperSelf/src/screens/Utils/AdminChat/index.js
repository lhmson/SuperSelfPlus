import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import styles from "./styles";

import LiveChat from "react-native-livechat";

function AdminChat({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* <LiveChat
          license="12939330"
          redirectUri="https://example.org"
          clientId="39df9d0114585d22820ef51b08b61cf7"
        /> */}
      </View>
    </ScrollView>
  );
}

export default AdminChat;
