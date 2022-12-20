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

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};
