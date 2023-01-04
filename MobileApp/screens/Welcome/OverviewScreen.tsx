import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../navigation/navigationTypes";
type NavigationProps = StackScreenProps<AuthParamList, "Overview">;
const OverviewScreen = ({ navigation, route }: NavigationProps) => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Raleway_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/overview-image-1.png")}
            style={styles.firstImage}
          />
          <Text style={styles.firstImageText}>
            Discover <Text style={{ color: AlmostDark }}>your</Text> {"\n"}{" "}
            {"      "}next <Text style={{ color: AlmostDark }}>cocktail</Text>.
          </Text>
          <Text
            style={[
              styles.textBox,
              { marginHorizontal: 11, width: "auto", marginTop: 50 },
            ]}
          >
            Browse our wide selection {"\n"} of cocktail guides, and find {"\n"}
            your next favorite drink.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 80,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.textBox,
              { marginHorizontal: 19, marginTop: 50, textAlign: "right" },
            ]}
          >
            Read about the life {"\n"} and art behind cocktail {"\n"} making on
            our blog {"\n"} written by some {"\n"} of the worlds best {"\n"}{" "}
            cocktail masters
          </Text>
          <Image
            source={require("../../assets/overview-image-2.png")}
            style={styles.secondImage}
          />
          <Text style={styles.secondImageText}>
            Learn about {"\n"}cocktail{" "}
            <Text style={{ color: AlmostWhite }}>mastery</Text>
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 80 }}
        >
          <Image
            source={require("../../assets/overview-image-3.png")}
            style={styles.thirdImage}
          />
          <Text style={styles.thirdImageText}>
            Share it with {"\n"}
            <Text style={{ color: AlmostWhite }}>friends</Text>
          </Text>
          <Text
            style={[
              styles.textBox,
              {
                marginHorizontal: 11,
                width: "auto",
                marginTop: 50 - 34,
                textAlign: "left",
              },
            ]}
          >
            {" "}
            As everything else in life {"\n"} a cocktail is best shared {"\n"}{" "}
            with a friend. So let your {"\n"} next cocktail discovery {"\n"} be
            enjoyed with the one’s {"\n"} you love.
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("InitialCustomization")}
        >
          <Text style={styles.buttonText}> Flavour Profile </Text>
          <Feather name="chevron-right" size={24} color={AlmostWhite} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  firstImage: {
    width: 151,
    height: 300,
    resizeMode: "cover",
  },
  firstImageText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 32,
    position: "absolute",
    left: 10,
    top: 34,
    color: AlmostWhite,
  },
  secondImage: {
    width: 151,
    height: 300,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  secondImageText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 32,
    position: "absolute",
    right: 5,
    top: -34,
    color: AlmostDark,
  },
  thirdImage: {
    width: 151,
    height: 300,
    resizeMode: "contain",
  },
  thirdImageText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 32,
    position: "absolute",
    left: 37,
    top: -34,
    color: AlmostDark,
  },
  textBox: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular",
    color: AlmostDark,
  },
  button: {
    marginTop: 40,
    marginBottom: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "80%",
    placeSelf: "center",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: RedLight,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostWhite,
  },
});

export default OverviewScreen;
