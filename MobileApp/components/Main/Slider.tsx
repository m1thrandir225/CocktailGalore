import { View, useWindowDimensions, FlatList } from "react-native";
import React from "react";
import CocktailCard from "./CocktailCard";

const Slider = ({ data }: { data: any }) => {
  const { width } = useWindowDimensions();
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <CocktailCard title={item.title} image={item.image} key={index} />;
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      snapToAlignment="center"
      ItemSeparatorComponent={() => <View style={{ width: width * 0.02 }} />}
      disableIntervalMomentum={true}
      snapToInterval={252 + width * 0.02}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={3}
      bounces={false}
      centerContent={true}
    />
  );
};

export default Slider;
