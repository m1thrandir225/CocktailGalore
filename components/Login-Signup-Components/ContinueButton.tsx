import { Text, Pressable, Image, StyleSheet, Platform } from "react-native";

import React from "react";

import { Cream, Tar } from "../../constants/globalStyles";
import { ImageSourcePropType } from "react-native";
const ContinueWithButton = ({
  image,
  text,
}: {
  image: ImageSourcePropType;
  text: string;
}) => {
  return (
    <Pressable style={styles.container}>
      <Image style={styles.icon} source={image} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Cream,
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    textAlign: "center",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    ...(Platform.OS === "android" && {
      elevation: 5,
    }),
    marginTop: 17 / 2,
    marginBottom: 17 / 2,
    paddingTop: 11,
    paddingBottom: 11,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    marginLeft: 20,
  },
  text: {
    color: Tar,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default ContinueWithButton;
