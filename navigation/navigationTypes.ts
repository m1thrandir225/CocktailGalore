import { NavigatorScreenParams } from "@react-navigation/native";

export type WelcomeStackParamList = {
  Welcome: undefined;
  Flavours: undefined;
  FeatureOverview: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
  AllCocktails: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type AppStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};
