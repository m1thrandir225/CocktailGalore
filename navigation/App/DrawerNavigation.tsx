import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppParamList } from "../navigationTypes";
import HomeScreen from "../../screens/App/HomeScreen";
import SearchScreen from "../../screens/App/SearchScreen";
import SettingsScreen from "../../screens/App/SettingsScreen";
import InsightsScreen from "../../screens/App/InsightsScreen";
import CocktailsScreen from "../../screens/App/CocktailsScreen";
import MyProfileScreen from "../../screens/App/MyProfileScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import FeatherIcons from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  RedLight,
  AlmostDark,
  AlmostWhite,
} from "../../constants/globalStyles";
import {
  Raleway_700Bold,
  useFonts,
  Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import { DrawerActions } from "@react-navigation/native";

const CustomDrawerContent = (props: any) => {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
  });
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AlmostWhite }}>
      <Image
        source={require("../../assets/logo-dark.png")}
        style={{
          width: 145,
          height: 90,
          alignSelf: "center",
          marginTop: 35,
          resizeMode: "contain",
        }}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          flex: 0.1,
          justifyContent: "center",
          alignItems: "flex-start",
          marginLeft: 25,
          marginBottom: 35,
        }}
      >
        <Text
          style={{
            fontFamily: "Raleway_700Bold",
            fontSize: 24,
            marginBottom: 11,
          }}
        >
          <FontAwesome name="heart" size={24} /> Rate Us
        </Text>
        <Text
          style={{
            fontFamily: "Raleway_400Regular",
            fontSize: 18,
          }}
        >
          App Ver: 0.1.12
        </Text>
      </View>
    </SafeAreaView>
  );
};

const AppDrawer = createDrawerNavigator<AppParamList>();

const AppNavigation = () => {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation, route }) => ({
        drawerActiveTintColor: RedLight,
        drawerActiveBackgroundColor: "transparent",
        drawerInactiveTintColor: AlmostDark,
        drawerLabelStyle: {
          marginLeft: -16,
          fontSize: 28,
          fontFamily: "Raleway_700Bold",
        },
        drawerType: "slide",
        headerShown: true,
        headerStyle: {
          backgroundColor: AlmostWhite,
          height: 130,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Raleway_700Bold",
          fontSize: 20,
          textTransform: "uppercase",
          padding: 5,

          borderBottomWidth: 2,
          borderBottomColor: RedLight,
        },
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
            style={{ marginLeft: 25 }}
          >
            <FeatherIcons name="menu" size={24} color={AlmostDark} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate("Search")}
            style={{ marginRight: 25 }}
          >
            <FeatherIcons name="search" size={24} color={AlmostDark} />
          </Pressable>
        ),
      })}
    >
      <AppDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FeatherIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FeatherIcons name="user" size={24} color={color} />
          ),
          title: "My Profile",
        }}
      />
      <AppDrawer.Screen
        name="Cocktails"
        component={CocktailsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="local-bar" size={24} color={color} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FeatherIcons name="book" size={24} color={color} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FeatherIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </AppDrawer.Navigator>
  );
};

export default AppNavigation;
