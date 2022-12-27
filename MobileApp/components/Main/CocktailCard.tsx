import {
  View,
  Text,
  ImageSourcePropType,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export interface CocktailCardProps {
  image: ImageSourcePropType;
  title: string;
  isSmall?: boolean;
  additionalStyles?: any;
}
const CocktailCard = ({
  image,
  title,
  isSmall,
  additionalStyles,
}: CocktailCardProps) => {
  const [pressed, setPressed] = React.useState(false);
  if (isSmall) {
    return (
      <Pressable style={[styles.containerSmall, additionalStyles]}>
        <View style={styles.imageSmall}>
          <Image source={image} style={styles.imageSmall} />
          <Pressable
            onPress={() => setPressed(!pressed)}
            style={styles.heartContainerSmall}
          >
            <FontAwesome
              name={pressed ? "heart" : "heart-o"}
              size={13.1}
              color={AlmostWhite}
            />
          </Pressable>
        </View>
        <Text style={styles.textSmall}>{title}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable style={[styles.container, additionalStyles]}>
      <Image source={image} style={styles.image} />
      <Pressable
        style={styles.heartContainer}
        onPress={() => setPressed(!pressed)}
      >
        <FontAwesome
          name={pressed ? "heart" : "heart-o"}
          size={24}
          color={AlmostWhite}
        />
      </Pressable>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 252,
    height: 410,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerSmall: {
    width: 156,
    height: 261.75,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heartContainer: {
    position: "absolute",
    padding: 13,
    backgroundColor: RedLight,
    borderRadius: 50 / 2,
    right: 15,
    bottom: 74,
  },
  heartContainerSmall: {
    position: "absolute",
    padding: 7.1,
    backgroundColor: RedLight,
    borderRadius: 50 / 2,
    right: 11.5,
    bottom: 12.5,
  },
  image: {
    width: 252,
    height: 351,
    resizeMode: "cover",
  },
  imageSmall: {
    width: 156,
    height: 217.29,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
    color: AlmostDark,
    textAlign: "center",
  },
  textSmall: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: AlmostDark,
    textAlign: "center",
  },
});
export default CocktailCard;
