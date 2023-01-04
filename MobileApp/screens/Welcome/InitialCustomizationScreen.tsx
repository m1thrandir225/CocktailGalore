import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import {
  AlmostDark,
  AlmostWhite,
  RedDark,
  RedLight,
} from "../../constants/globalStyles";
import { useFonts } from "expo-font";
import { Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import {
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../context/AuthContext";
import type { Flavour } from "../../constants/globalTypes";
import FlavourButton from "../../components/Reusable/FlavourButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../navigation/navigationTypes";

type NavigationProps = StackScreenProps<AuthParamList, "InitialCustomization">;

const InitialCustomizationScreen = ({ navigation, route }: NavigationProps) => {
  const [flavours, setFlavours] = React.useState<Flavour[] | null>(null);
  const [myFlavours, setMyFlavours] = React.useState<Flavour[] | null>(null);
  const [profilePicture, setProfilePicture] = React.useState<any>(null);
  const [profilePictureUri, setProfilePictureUri] = React.useState<any>(null);
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });
  const state = React.useContext(AuthContext);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePicture(result.assets[0]);
      setProfilePictureUri(result.assets[0].uri);
    }
  };
  const handleMyFlavour = (flavour: Flavour) => {
    if (myFlavours?.includes(flavour)) {
      setMyFlavours(myFlavours?.filter((f) => f !== flavour));
    } else {
      setMyFlavours([...(myFlavours ?? []), flavour]);
    }
  };

  const sendData = async () => {
    state?.setLoading(true);
    const data = new FormData();
    let filename = profilePicture?.uri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    data.append("id", state?.user ? JSON.stringify(state?.user?.id) : "");
    data.append("profileImage", {
      uri: profilePictureUri,
      name: filename,
      type: type,
    });
    try {
      const myFlavoursUpdateRes = await fetch(
        "http://192.168.0.108:4000/users/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: state?.user?.id,
            flavourIds: myFlavours?.map((f) => f.id),
          }),
        },
      );
      const myFlavoursUpdateData = await myFlavoursUpdateRes.json();
      state?.updateUserData(myFlavoursUpdateData.user);
      const profilePictureUpdateRes = await fetch(
        "http://192.168.0.108:4000/users/user/profileImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: data,
        },
      );
      const profilePictureUpdateData = await profilePictureUpdateRes.json();
      state?.updateUserData(profilePictureUpdateData.user);
    } catch (error: any) {
      state?.setError(error.message);
    } finally {
      state?.setLoading(false);
      state?.setNewUser(false);
    }
  };

  React.useEffect(() => {
    const getFlavours = async () => {
      state?.setLoading(true);
      try {
        const response = await fetch("http://192.168.0.108:4000/flavours");
        const data = await response.json();
        setFlavours(data.flavours);
      } catch (error) {
        console.log(error);
      } finally {
        state?.setLoading(false);
      }
    };
    if (flavours == null) {
      getFlavours();
    }
  }, [flavours]);
  if (state?.loading) return null;
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo-dark.png")}
          style={styles.logo}
        />
        <Text style={[styles.title]}> Add a profile {"\n"} picture </Text>
        <Pressable
          style={[styles.profilePictureButton, {}]}
          onPress={() => pickImage()}
        >
          {profilePictureUri === null && (
            <Feather
              name="plus"
              size={75}
              color={AlmostWhite}
              style={{ position: "absolute", zIndex: 10 }}
            />
          )}

          <Image
            source={{ uri: profilePictureUri }}
            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
          />
        </Pressable>
        <Text style={[styles.title, { marginBottom: 15 }]}>
          Customize your {"\n"} flavour profile{" "}
        </Text>
        <Text style={[styles.subtitle, { marginBottom: 50 }]}>
          Select your favorite flavors {"\n"} for cocktails so we can give
          {"\n"} you the best recommendations.
        </Text>
        <View style={styles.flavourContainer}>
          {flavours != null
            ? flavours.map((flavour) => (
                <FlavourButton
                  flavour={flavour}
                  handleMyFlavour={handleMyFlavour}
                  key={flavour.id}
                />
              ))
            : null}
        </View>
        <Pressable
          style={[styles.discoverButton, { marginTop: 50, marginBottom: 80 }]}
          onPress={async () => {
            await sendData();
          }}
        >
          <Text style={[styles.discoverButtonText]}> Discover </Text>
          <Feather name="chevron-right" size={24} color={AlmostWhite} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  logo: {
    marginTop: 45,
    marginBottom: 50,
    width: 145,
    height: 90,
  },
  title: {
    fontSize: 32,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
    color: AlmostDark,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Raleway_600SemiBold",
    textAlign: "center",
    color: RedLight,
  },
  profilePictureButton: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    backgroundColor: RedLight,
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    marginVertical: 50,
  },
  discoverButton: {
    width: "80%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RedLight,
    borderRadius: 5,
    flexDirection: "row",
  },
  discoverButtonText: {
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostWhite,
  },
  flavourContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InitialCustomizationScreen;
