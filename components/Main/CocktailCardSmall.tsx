import {
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const CocktailCardSmall = ({
  image,
  title,
}: {
  image: ImageSourcePropType;
  title: string;
}) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Pressable style={styles.container}>
      <View style={styles.image}>
        <Image source={image} style={styles.image} />
        <Pressable
          onPress={() => setPressed(!pressed)}
          style={styles.heartContainer}
        >
          <FontAwesome
            name={pressed ? "heart" : "heart-o"}
            size={13.1}
            color={AlmostWhite}
          />
        </Pressable>
      </View>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 156,
    height: 261.75,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heartContainer: {
    position: "absolute",
    padding: 7.1,
    backgroundColor: RedLight,
    borderRadius: 50 / 2,
    right: 11.5,
    bottom: 12.5,
  },
  image: {
    width: 156,
    height: 217.29,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: AlmostDark,
    textAlign: "center",
  },
});

export default CocktailCardSmall;
