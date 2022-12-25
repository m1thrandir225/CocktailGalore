import {
  View,
  Text,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import CocktailCardLarge from "./CocktailCardLarge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";
const Slider = ({ data }: { data: any }) => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const [newData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={SIZE}
        decelerationRate={0}
        onScroll={onScroll}
      >
        {newData.map((item, index) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.85, 1, 0.9],
            );
            return {
              transform: [{ scale }],
            };
          });
          if (!item.image) {
            return <View style={{ width: SPACER }} key={index}></View>;
          }
          return (
            <View style={{ width: SIZE }} key={index}>
              <CocktailCardLarge
                title={item.title}
                image={item.image}
                animatedStyle={style}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default Slider;
