import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import React from "react";

const InsightCard = ({
  image,
  title,
  author,
  authorImage,
  width,
  height,
}: {
  image: ImageSourcePropType;
  title: string;
  author: string;
  authorImage: ImageSourcePropType;
  width?: number;
  height?: number;
}) => {
  return (
    <View
      style={[styles.container, { width: width || 315, height: height || 389 }]}
    >
      <Text>InsightCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default InsightCard;
