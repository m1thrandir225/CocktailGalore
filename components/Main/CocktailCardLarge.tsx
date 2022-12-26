import {
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import React from "react";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated from "react-native-reanimated";

const CocktailCardLarge = ({
  image,
  title,
  animatedStyle,
}: {
  image: ImageSourcePropType;
  title: string;
  animatedStyle?: any;
}) => {
  const [loaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const [pressed, setPressed] = React.useState(false);
  if (!loaded) {
    return null;
  }
  if (animatedStyle) {
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <Pressable
          onPress={() => console.log("cocktail slider image pressed ")}
        >
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
      </Animated.View>
    );
  }
  return (
    <Pressable style={[styles.container]}>
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
    justifyContent: "center",
  },
  heartContainer: {
    position: "absolute",
    padding: 13,
    backgroundColor: RedLight,
    borderRadius: 50 / 2,
    right: 15,
    bottom: 74,
  },
  image: {
    width: 252,
    height: 351,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
    color: AlmostDark,
    textAlign: "center",
  },
});

export default CocktailCardLarge;
