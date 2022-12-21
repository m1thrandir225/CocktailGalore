import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Mauave, Tar } from "../../constants/globalStyles";

const CategoryListing = ({ categories }: { categories: string[] }) => {
  const [selected, setSelected] = React.useState<string>(categories[0]);
  return (
    <View style={styles.container}>
      {categories.map((category: string, idx: number) => (
        <Pressable
          key={idx}
          style={styles.categoryContainer}
          onPress={() => setSelected(category)}
        >
          <Text
            style={[
              styles.category,
              {
                color: selected == category ? Mauave : Tar,
                borderBottomColor:
                  selected == category ? Mauave : "transparent",
              },
            ]}
          >
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  categoryContainer: {
    // flex: 0.25,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "transparent",
  },
  category: {
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    marginRight: 10,
  },
});

export default CategoryListing;
