import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  Image,
} from "react-native";
import React from "react";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import { useFonts } from "expo-font";
import {
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Feather from "@expo/vector-icons/Feather";
const InsightCard = ({
  image,
  title,
  author,
  authorImage,
  width,
  height,
}: {
  image: ImageSourcePropType;
  title: string;
  author: string;
  authorImage: ImageSourcePropType;
  width?: number;
  height?: number;
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={[styles.container, { width: width || 315, height: height || 389 }]}
    >
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.authorInfoBox}>
          <Image source={authorImage} style={styles.authorImage} />
          <Text style={styles.authorName}>{author}</Text>
        </View>
        <Pressable style={styles.continueButton}>
          <Feather name="chevron-right" size={24} color={AlmostWhite} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: AlmostWhite,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AlmostDark,
    alignSelf: "center",
    marginBottom: 35,
    alignContent: "center",
    justifyContent: "flex-start",
  },
  cardImage: {
    width: 265,
    height: 161,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    color: AlmostDark,
    fontFamily: "Montserrat_600SemiBold",
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 10,
    textAlign: "center",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorInfoBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: RedLight,
  },
  authorName: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
    marginLeft: 5,
  },
  continueButton: {
    padding: 13,
    borderRadius: 50 / 2,
    backgroundColor: RedLight,
    elevation: 5,
    borderWidth: 1,
    borderColor: RedLight,
  },
});

export default InsightCard;
