import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const HeaderWelcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo_tar.png")}
        style={styles.logo}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
  logo: {
    width: 183,
    height: 73,
  },
});
export default HeaderWelcome;
