import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ImageSourcePropType } from "react-native";
import { Cream, Tar } from "../../constants/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
const CocktailCardLarge = ({
  image,
  name,
  padding,
}: {
  image: ImageSourcePropType;
  name: string;
  padding?: number;
}) => {
  return (
    <View
      style={[styles.container, { marginLeft: padding, marginRight: padding }]}
    >
      <LinearGradient
        colors={["rgba(139, 103, 124, 0.3)", "rgba(19, 24, 38, 0.6)"]}
        style={styles.gradient}
      />
      <ImageBackground source={image} style={styles.image} />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{name} </Text>
        <FontAwesome name="heart-o" size={24} color={Cream} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: 252,
    height: 351,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    height: 351,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 351,
    justifyContent: "flex-end",
  },
  infoBox: {
    flex: 0.1,
    backgroundColor: "transparent",
    width: 252,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    position: "absolute",
    bottom: 0,
    zIndex: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Cream,
  },
});
export default CocktailCardLarge;
