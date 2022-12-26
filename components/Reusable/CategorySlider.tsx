import { View, Text, StyleSheet } from "react-native";
import React, { ReactElement } from "react";
import { AlmostDark, AlmostWhite } from "../../constants/globalStyles";
import { FlatList } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

const CategorySlider = ({
  categories,
  posts,
  title,
  PostsElement,
  CategoryElement,
  PostsElementWidth,
  CategoryElementWidth,
}: {
  categories: any[];
  posts: any[];
  title: string;
  PostsElement: React.FC<any>;
  CategoryElement: React.FC<any>;
  PostsElementWidth?: number;
  CategoryElementWidth?: number;
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const renderCategory = ({ item, index }: { item: any; index: number }) => {
    return <CategoryElement {...item} key={index} />;
  };
  const renderPosts = ({ item, index }: { item: any; index: number }) => {
    return <PostsElement {...item} key={index} />;
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        horizontal={true}
        snapToAlignment={"start"}
        snapToInterval={
          CategoryElementWidth != undefined ? CategoryElementWidth : 100
        }
        decelerationRate={0}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={styles.categoreisContainer}
        contentContainerStyle={{ paddingLeft: 25 }}
      />
      <FlatList
        data={posts}
        renderItem={renderPosts}
        horizontal={true}
        snapToAlignment={"start"}
        decelerationRate={0}
        snapToInterval={
          PostsElementWidth != undefined ? PostsElementWidth : 100
        }
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={styles.postsContainer}
        contentContainerStyle={{ paddingLeft: 25 }}
        centerContent={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  categoreisContainer: {
    marginTop: 15,
  },
  postsContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
    paddingLeft: 25,
  },
});

export default CategorySlider;
