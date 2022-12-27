import { NavigatorScreenParams } from "@react-navigation/native";
export type AuthParamList = {
  //stack navigation
  Login: undefined;
  Signup: undefined;
};

export type WelcomeParamList = {
  // stack navigation
  Welcome: undefined;
  Overview: undefined;
  InitialCustomization: undefined;
  AuthStack: NavigatorScreenParams<AuthParamList>;
};

export type AppParamList = {
  // this is a drawer
  Home: undefined;
  MyProfile: undefined;
  Cocktails: undefined;
  Insights: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<AppParamList>;
  Search: undefined;
};

/*
 Logic for the app navigation goes as:

 First we go to the Welcome Navigaton Stack, which the initial is the Welcome Screen.
 From there we choose if we want to Login or Signup and we go to the Auth Stack.
 If we choose to Login, we go to the Login Screen, if we choose to Signup, we go to the Signup Screen.
 After we Login or Signup, we go to the App Stack, which is the main navigation of the app.
 From there we can go to the Home Screen, My Profile Screen, Cocktails Screen, Insights Screen, Settings Screen and Search Screen.
*/
