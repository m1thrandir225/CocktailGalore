import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { AppParamList } from "../../navigation/navigationTypes";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import CocktailCardLarge from "../../components/Main/CocktailCardLarge";
import HomeTitle from "../../components/Main/HomeTitle";
import Slider from "../../components/Main/Slider";
import InsightCard from "../../components/Main/InsightCard";

type NavigationProps = DrawerScreenProps<AppParamList, "Home">;
const HomeScreen = ({ navigation, route }: NavigationProps) => {
  const [loaded] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold,
  });
  if (!loaded) {
    return null;
  }
  const cocktailData = [
    {
      id: "1",
      title: "Negroni",
      image: require("../../assets/cocktail-image-1.png"),
    },
    {
      id: "2",
      title: "Spagliato",
      image: require("../../assets/cocktail-image-2.png"),
    },
    {
      id: "3",
      title: "Negroni",
      image: require("../../assets/cocktail-image-1.png"),
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <HomeTitle
        title={"Our Daily" + "\n" + "Recommendation"}
        subtitle={"Your daily cocktail"}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CocktailCardLarge
          image={require("../../assets/cocktail-image-1.png")}
          title={"Negroni"}
        />
      </View>
      <HomeTitle
        title={"World's Famous"}
        subtitle={
          "Recipes and guides on the" + "\n" + "world’s most famous cocktails"
        }
      />
      <Slider data={cocktailData} />
      <Pressable style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}> View All</Text>
      </Pressable>
      <HomeTitle
        title={"Latest Insight"}
        subtitle={
          "The latest deep dive into " + "\n" + "the life of cocktail making"
        }
      />
      <InsightCard
        image={require("../../assets/insight-image-1.png")}
        author={"James Gunn"}
        authorImage={}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  viewAllButton: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: AlmostDark,
    width: 183,
    marginTop: 35,
    alignSelf: "center",
  },
  viewAllButtonText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 28,
    color: AlmostDark,
  },
});

export default HomeScreen;
