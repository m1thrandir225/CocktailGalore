import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React from "react";
import { AlmostDark, AlmostWhite } from "../../constants/globalStyles";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import Category from "./Category";

const CategorySlider = ({
  categories,
  posts,
  title,
  PostsElement,
  PostsElementWidth,
  CategoryElementWidth,
  PostIsSmall,
  style,
}: {
  categories: any[];
  posts: any[];
  title: string;
  PostsElement: React.FC<any>;
  PostsElementWidth?: number;
  CategoryElementWidth?: number;
  PostIsSmall?: boolean;
  style?: any;
}) => {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const { width } = useWindowDimensions();

  const [currentCategory, setCurrentCategory] = React.useState<string>(
    categories[0].title,
  );
  const renderCategory = ({ item, index }: { item: any; index: number }) => {
    return (
      <Category
        {...item}
        key={index}
        isCurrent={currentCategory == item.title}
        setCurrentCategory={setCurrentCategory}
      />
    );
  };
  const renderPosts = ({ item, index }: { item: any; index: number }) => {
    return (
      <PostsElement
        {...item}
        key={index}
        isSmall={PostIsSmall ? true : false}
      />
    );
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        horizontal={true}
        snapToAlignment={"start"}
        decelerationRate={"normal"}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={styles.categoreisContainer}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
      <FlatList
        data={posts}
        renderItem={renderPosts}
        horizontal={true}
        snapToAlignment={"start"}
        decelerationRate={0}
        bounces={false}
        snapToInterval={
          PostsElementWidth
            ? PostsElementWidth + width * 0.02
            : width * 0.67 + width * 0.02
        }
        showsHorizontalScrollIndicator={false}
        style={styles.postsContainer}
        contentContainerStyle={{ paddingLeft: 25, paddingRight: 25 }}
        centerContent={true}
        ItemSeparatorComponent={() => <View style={{ width: width * 0.02 }} />}
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
    marginLeft: 25,
    paddingRight: 25,
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
