import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Modal,
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
  const [error, setError] = React.useState<string | null>(null);
  const [updateUser, { isError }] = useUpdateUserMutation();
  const [loading, setLoading] = React.useState(false);

  const {
    data,
    isError: isErrorFlavours,
    error: errorFlavours,
    isLoading,
    isFetching,
    currentData,
  } = useGetFlavoursQuery();

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
    if (profilePictureUri && !error && myFlavours?.length > 0) {
      try {
        setLoading(true);
        const response = await FileSystem.uploadAsync(
          "https://galore-cocktails-more-production.up.railway.app/users/user/" +
            user?.id,
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
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      if (myFlavours?.length == 0) {
        setError("Please select at least one flavour");
      } else {
        setError("Please select a profile picture");
      }
    }
    if (myFlavours?.length !== 0 && !error && profilePictureUri) {
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
    } else {
      if (!profilePictureUri) {
        setError("Please select a profile picture");
      } else {
        setError("Please select at least one flavour");
      }
    }
    if (myFlavours?.length == 0 && profilePictureUri == null) {
      setError(
        "Please select at least one flavour and set a profile picture !",
      );
    }
  };
  React.useEffect(() => {
    if (
      myFlavours != null &&
      myFlavours?.length > 0 &&
      profilePictureUri != null
    ) {
      setError(null);
    }
  }, [myFlavours, profilePictureUri]);
  if (loading || isLoading || isFetching) {
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
        <Modal
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          animationType="fade"
          transparent={true}
          visible={error != null}
        >
          <View
            style={{
              flex: 1,

              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: AlmostWhite,
                width: "75%",
                borderRadius: 20,
                paddingHorizontal: 35,
                paddingBottom: 35,
                paddingTop: 15,
                elevation: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat_700Bold",
                    color: RedLight,
                    fontSize: 20,
                  }}
                >
                  Error:
                </Text>
                <Pressable onPress={() => setError(null)}>
                  <Feather name="x-circle" size={24} color={RedLight} />
                </Pressable>
              </View>
              <Text
                style={{
                  color: AlmostDark,
                  fontFamily: "Montserrat_700Bold",
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {error}
              </Text>
            </View>
          </View>
        </Modal>
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
          Customize your {"\n"} flavour profile
        </Text>
        <Text style={[styles.subtitle, { marginBottom: 50 }]}>
          Select your favorite flavors {"\n"} for cocktails so we can give
          {"\n"} you the best recommendations.
        </Text>
        <View style={styles.flavourContainer}>
          {data != undefined
            ? data.flavours.map((flavour) => (
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
