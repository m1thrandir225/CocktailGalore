import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/HomeComponents/Header";
import { Cream, Tar } from "../../constants/globalStyles";
import { HomeStackParamList } from "../../navigation/navigationTypes";
import CocktailCardLarge from "../../components/GlobalComponents/CocktailCardLarge";
import CategoryListing from "../../components/GlobalComponents/CategoryListing";
import { StackScreenProps } from "@react-navigation/stack";

type NavigationProps = StackScreenProps<HomeStackParamList, "Home">;

const HomeScreen = ({ navigation, route }: NavigationProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require("../../assets/homeBg.png")}
          imageStyle={{ resizeMode: "stretch" }}
          style={{
            width: 350,
            height: 1428.08,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        />
        <Header navigation={navigation} route={route} />
        <Text style={styles.title}>Our Daily {"\n"} Recommendation</Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <CocktailCardLarge
            image={require("../../assets/cocktailImage1.jpg")}
            name="Negroni"
          />
        </View>
        <Text style={styles.browseTitle}> Browse </Text>
        <CategoryListing
          categories={["Most Popular", "Most Loved", "World's Famous"]}
        />
        <ScrollView
          style={styles.carousel}
          horizontal={true}
          decelerationRate={"fast"}
          snapToInterval={260}
          snapToAlignment={"start"}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CocktailCardLarge
            image={require("../../assets/cocktailImage1.jpg")}
            name="Negroni"
            padding={25 / 2}
          />
          <CocktailCardLarge
            image={require("../../assets/cocktailImage2.jpg")}
            name="Old Fashioned"
            padding={25 / 2}
          />
          <CocktailCardLarge
            image={require("../../assets/cocktailImage3.jpg")}
            name="Cocktail Name"
            padding={25 / 2}
          />
        </ScrollView>
        <Pressable
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("AllCocktails")}
        >
          <Text style={styles.viewAllText}> View All </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cream,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Tar,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 24,
  },
  browseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Tar,
    textAlign: "left",
    marginTop: 57,
    marginBottom: 15,
  },
  carousel: {
    flex: 1,
    marginBottom: 25,
    marginTop: 13,
  },
  viewAllButton: {
    elevation: 5,
    backgroundColor: Cream,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 128,
    marginLeft: 10,
    marginBottom: 76,
  },
  viewAllText: {
    fontSize: 22,
    fontWeight: "400",
    color: Tar,
  },
});

export default HomeScreen;
