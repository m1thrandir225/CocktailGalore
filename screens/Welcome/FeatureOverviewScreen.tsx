import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WelcomeStackParamList } from "../../navigation/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { Cream, globalStyles } from "../../constants/globalStyles";
import FeatureOverview from "../../components/WelcomeComponents/FeatureOverview";
import HeaderWelcome from "../../components/WelcomeComponents/HeaderWelcome";

type NavigationProps = StackScreenProps<
  WelcomeStackParamList,
  "FeatureOverview"
>;

const FeatureOverviewScreen = ({ navigation, route }: NavigationProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <HeaderWelcome />
        <View style={styles.featuresContainer}>
          <FeatureOverview
            icon={require("../../assets/features-icon-1.png")}
            text={"Discover new and" + "\n" + " tasty cocktail recipes"}
          />
          <FeatureOverview
            icon={require("../../assets/features-icon-2.png")}
            text={
              "Heart the ones you are" +
              "\n" +
              "interested in and save them" +
              "\n" +
              "for later"
            }
          />
          <FeatureOverview
            icon={require("../../assets/features-icon-3.png")}
            text={
              "Share your new" +
              "\n" +
              "favorite cocktails with" +
              "\n" +
              "friends."
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={globalStyles.filledButtonContainerTar}
            onPress={() =>
              navigation.navigate("AppStack", {
                screen: "HomeStack",
                params: { screen: "Home" },
              })
            }
          >
            <Text style={globalStyles.filledButtonTextTar}> Continue </Text>
          </Pressable>
        </View>
        <Image
          source={require("../../assets/featuresoverviewWaves.png")}
          style={{ resizeMode: "cover", width: "100%", height: 200 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cream,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 38,
    marginRight: 38,
    marginTop: 128,
    marginBottom: 34,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: 38,
    marginRight: 38,
    marginBottom: -30,
  },
});

export default FeatureOverviewScreen;
