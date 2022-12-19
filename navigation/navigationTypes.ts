import { NavigatorScreenParams } from "@react-navigation/native";

export type WelcomeStackParamList = {
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
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
