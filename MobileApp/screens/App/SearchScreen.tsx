import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import CocktailCard from "../../components/Main/CocktailCard";
import InsightCard from "../../components/Main/InsightCard";
import CategorySlider from "../../components/Reusable/CategorySlider";
import { AlmostDark, AlmostWhite } from "../../constants/globalStyles";
const SearchScreen = () => {
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
    {
      title: "Inspiration",
    },
    {
      title: "History",
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
  const insightCategories = [
    {
      title: "History",
    },
    {
      title: "Access",
    },
    {
      title: "Inspiration",
    },
  ];
  const insightData = [
    {
      id: "1",
      title: "The History of the Negroni",
      image: require("../../assets/insight-card-image.jpg"),
      author: "John Doe",
      authorImage: require("../../assets/author-image.jpg"),
    },
    {
      id: "2",
      title: "Cocktail Mastery 101",
      image: require("../../assets/insight-card-image.jpg"),
      author: "John Doe",
      authorImage: require("../../assets/author-image.jpg"),
    },
    {
      id: "3",
      title: "Behind the Bar",
      image: require("../../assets/insight-card-image.jpg"),
      author: "John Doe",
      authorImage: require("../../assets/author-image.jpg"),
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.searchBox}>
        <Feather name="search" size={24} color={AlmostDark} />
        <TextInput
          style={styles.searchBoxText}
          placeholder="Search for cocktails, insights..."
        ></TextInput>
      </Pressable>
      <Text style={styles.quickAccess}> Quick Access </Text>
      <CategorySlider
        PostsElement={CocktailCard}
        categories={categories}
        posts={cocktailData}
        title="Cocktails"
        PostIsSmall={true}
        PostsElementWidth={156}
      />
      <CategorySlider
        PostsElement={InsightCard}
        categories={insightCategories}
        posts={insightData}
        title="Insights"
        PostIsSmall={true}
        PostsElementWidth={190}
        style={[{ marginTop: 50, marginBottom: 80 }]}
      />
    </ScrollView>
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
