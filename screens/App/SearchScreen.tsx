import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import React from "react";
import { AlmostDark, AlmostWhite } from "../../constants/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import CategorySlider from "../../components/Reusable/CategorySlider";
import CocktailCardLarge from "../../components/Main/CocktailCardLarge";
import CocktailCardSmall from "../../components/Main/CocktailCardSmall";
const SearchScreen = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });
  if (!fontsLoaded) return null;
  const categories = [
    {
      title: "Cocktails",
    },
    {
      title: "Ingredients",
    },
    {
      title: "Recipes",
    },
  ];
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
      <Pressable style={styles.searchBox}>
        <Feather name="search" size={24} color={AlmostDark} />
        <Text style={styles.searchBoxText}>
          Search for cocktails, insights...
        </Text>
      </Pressable>
      <Text style={styles.quickAccess}> Quick Access </Text>
      <CategorySlider
        CategoryElement={Category}
        PostsElement={CocktailCardSmall}
        categories={categories}
        posts={cocktailData}
        title="Cocktails"
      />
    </ScrollView>
  );
};

const Category = ({ title }: { title: string }) => {
  return (
    <Pressable>
      <Text>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  searchBox: {
    flex: 1,
    backgroundColor: AlmostWhite,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: AlmostDark,
    marginHorizontal: 25,
    borderRadius: 10,
  },
  searchBoxText: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: AlmostDark,
    opacity: 0.8,
    marginRight: 15,
    padding: 10,
  },
  quickAccess: {
    fontSize: 32,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
  },
});

export default SearchScreen;
