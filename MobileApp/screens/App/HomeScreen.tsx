import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CocktailCard from "../../components/Main/CocktailCard";
import HomeTitle from "../../components/Main/HomeTitle";
import InsightCard from "../../components/Main/InsightCard";
import Slider from "../../components/Main/Slider";
import { AlmostDark, AlmostWhite } from "../../constants/globalStyles";
import { AppParamList } from "../../navigation/navigationTypes";

type NavigationProps = DrawerScreenProps<AppParamList, "Home">;

const HomeScreen = ({ navigation, route }: NavigationProps) => {
  const cocktailData = [
    {
      id: "1",
      title: "Negroni",
      image: require("../../assets/cocktail-image-1.png"),
    },
    {
      id: "2",
      title: "Martini",
      image: require("../../assets/cocktail-image-3.png"),
    },
    {
      id: "3",
      title: "Russian Spring Punch",
      image: require("../../assets/cocktail-image-2.png"),
    },
    {
      id: "4",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <HomeTitle
        title={"Our Daily" + "\n" + "Recommendation"}
        subtitle={"Your daily cocktail"}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CocktailCard
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
        author="James Gunn"
        authorImage={require("../../assets/author-image.jpg")}
        image={require("../../assets/insight-card-image.jpg")}
        title="Cocktail Mastery 101"
      />
      <Pressable style={[styles.viewAllButton, { marginBottom: 63 }]}>
        <Text style={styles.viewAllButtonText}> View All</Text>
      </Pressable>
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
