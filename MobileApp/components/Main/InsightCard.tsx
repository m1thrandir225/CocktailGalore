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
  isSmall,
}: {
  image: ImageSourcePropType;
  title: string;
  author: string;
  authorImage: ImageSourcePropType;
  isSmall?: boolean;
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  if (isSmall) {
    return (
      <View style={[styles.containerSmall]}>
        <Image source={image} style={styles.cardImageSmall} />
        <Text style={styles.titleSmall}>{title}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.authorInfoBox}>
            <Image source={authorImage} style={styles.authorImageSmall} />
            <Text style={styles.authorNameSmall}>{author}</Text>
          </View>
          <Pressable style={styles.continueButtonSmall}>
            <Feather name="chevron-right" size={14.5} color={AlmostWhite} />
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
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
    alignItems: "center",
    justifyContent: "flex-start",
    width: 315,
    height: 389,
  },
  containerSmall: {
    flex: 1,
    padding: 15.01,
    backgroundColor: AlmostWhite,
    borderRadius: 4.22,
    borderWidth: 2,
    borderColor: AlmostDark,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 190,
    height: 235.62,
  },
  cardImage: {
    width: 265,
    height: 161,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardImageSmall: {
    width: "100%",
    height: 97,
    borderRadius: 6.03,
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
  titleSmall: {
    fontSize: 16,
    color: AlmostDark,
    fontFamily: "Montserrat_600SemiBold",
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginBottom: 10,
    textAlign: "center",
    textAlignVertical: "center",
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
  authorImageSmall: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: RedLight,
  },
  authorName: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
    marginLeft: 5,
  },
  authorNameSmall: {
    fontSize: 12,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
    marginLeft: 3,
  },
  continueButton: {
    padding: 13,
    borderRadius: 50 / 2,
    backgroundColor: RedLight,
    elevation: 5,
    borderWidth: 1,
    borderColor: RedLight,
  },
  continueButtonSmall: {
    padding: 7.84,
    borderRadius: 30 / 2,
    backgroundColor: RedLight,
    elevation: 5,
    borderWidth: 1,
    borderColor: RedLight,
  },
});

export default InsightCard;
