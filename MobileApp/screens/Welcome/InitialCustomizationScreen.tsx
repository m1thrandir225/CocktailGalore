import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
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
import * as ImagePicker from "expo-image-picker";
import type { Flavour } from "../../constants/globalTypes";
import FlavourButton from "../../components/Reusable/FlavourButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../navigation/navigationTypes";
import * as FileSystem from "expo-file-system";
import { useUpdateUserMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import { useGetFlavoursQuery } from "../../redux/api/apiSlice";
type NavigationProps = StackScreenProps<AuthParamList, "InitialCustomization">;

const InitialCustomizationScreen = ({ navigation, route }: NavigationProps) => {
  const [flavours, setFlavours] = React.useState<Flavour[] | null>(null);
  const [myFlavours, setMyFlavours] = React.useState<Flavour[] | null>(null);
  const [profilePicture, setProfilePicture] = React.useState<any>(null);
  const [profilePictureUri, setProfilePictureUri] = React.useState<any>(null);
  const [error, setError] = React.useState(null);
  const [updateUser, { isError }] = useUpdateUserMutation();
  const [loading, setLoading] = React.useState(false);

  const { data, isFetching, error: errorFlavours } = useGetFlavoursQuery();
  console.log(errorFlavours);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePictureUri(result.assets[0].uri);
      setProfilePicture(result.assets[0]);
    }
  };
  const handleMyFlavour = (flavour: Flavour) => {
    if (myFlavours?.includes(flavour)) {
      setMyFlavours(myFlavours?.filter((f) => f !== flavour));
    } else {
      setMyFlavours([...(myFlavours ?? []), flavour]);
    }
  };
  const handleContinue = async () => {
    if (myFlavours?.length !== 0) {
      try {
        setLoading(true);
        const myFlavoursUpdateResult = await updateUser({
          id: user?.id,
          flavourIds: myFlavours?.map((f) => f.id),
        }).unwrap();
        dispatch(setUser({ user: myFlavoursUpdateResult.user }));
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    if (profilePictureUri) {
      try {
        setLoading(true);
        const response = await FileSystem.uploadAsync(
          "http://192.168.100.20:4000/users/updateUser/profileImage",
          profilePictureUri,
          {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "profileImage",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            parameters: {
              id: JSON.stringify(user?.id),
            },
          },
        );
        const data = await JSON.parse(response.body);
        dispatch(setUser({ user: data.user }));
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  // React.useEffect(() => {
  //   const getFlavours = async () => {
  //     try {
  //       const response = await fetch("http://192.168.100.20:4000/flavours");
  //       const data = await response.json();
  //       setFlavours(data.flavours);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (flavours == null) {
  //     getFlavours();
  //   }
  // }, [flavours]);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: AlmostWhite,
        }}
      >
        <ActivityIndicator size={"large"} color={RedLight} />
      </View>
    );
  }
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
          {data != undefined
            ? data.map((flavour) => (
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
          onPress={() => handleContinue()}
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
