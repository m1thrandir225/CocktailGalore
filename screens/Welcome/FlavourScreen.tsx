import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import HeaderWelcome from "../../components/WelcomeComponents/HeaderWelcome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Cream, Tar, globalStyles } from "../../constants/globalStyles";
import ButtonWithIcon from "../../components/WelcomeComponents/FlavourButton";
import { WelcomeStackParamList } from "../../navigation/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";

type NavigationProps = StackScreenProps<WelcomeStackParamList, "Flavours">;

const FlavourScreen = ({ navigation, route }: NavigationProps) => {
  const flavours = [
    "Bitter",
    "Sweet",
    "Sour",
    "Spicy",
    "Fruity",
    "Savoury",
    "Smoky",
    "Herbal",
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <HeaderWelcome />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose your favorite</Text>
          <Text style={styles.title}>cocktail flavors</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {flavours.map((flavour: string, idx: number) => (
            <ButtonWithIcon
              key={idx}
              text={flavour}
              containerStyle={styles.flavourButtonContainer}
              pressedContainerStyle={styles.flavourButtonClicked}
              textStyle={styles.flavourButtonText}
              pressedTextStyle={styles.flavourButtonTextClicked}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={globalStyles.filledButtonContainerTar}
            onPress={() => navigation.navigate("FeatureOverview")}
          >
            <Text style={globalStyles.filledButtonTextTar}> Continue </Text>
          </Pressable>
        </View>
        <Image
          source={require("../../assets/flavourWaves.png")}
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
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 68,
  },
  title: {
    color: Tar,
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "column",
    marginTop: 40,
    marginBottom: 50,
  },
  flavourButtonContainer: {
    backgroundColor: Cream,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 7,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 38,
    marginRight: 38,
  },
  flavourButtonText: {
    color: Tar,
    fontSize: 22,
    fontWeight: "bold",
  },
  flavourButtonClicked: {
    backgroundColor: Tar,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 7,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 38,
    marginRight: 38,
  },
  flavourButtonTextClicked: {
    color: Cream,
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: 38,
    marginRight: 38,
    marginBottom: 42,
  },
});
export default FlavourScreen;
