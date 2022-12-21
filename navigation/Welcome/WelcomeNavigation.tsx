import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import WelcomeScreen from "../../screens/Welcome/WelcomeScreen";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { WelcomeStackParamList } from "../navigationTypes";
import AuthNavigation from "../Auth/AuthNavigation";
import FlavourScreen from "../../screens/Welcome/FlavourScreen";
import FeatureOverviewScreen from "../../screens/Welcome/FeatureOverviewScreen";
import AppNavigation from "../AppNavigation";

const WelcomeStack = createStackNavigator<WelcomeStackParamList>();

const WelcomeNavigation = () => {
  return (
    <WelcomeStack.Navigator
      initialRouteName="AppStack"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <WelcomeStack.Screen name="Flavours" component={FlavourScreen} />
      <WelcomeStack.Screen
        name="FeatureOverview"
        component={FeatureOverviewScreen}
      />
      <WelcomeStack.Screen name="Auth" component={AuthNavigation} />
      <WelcomeStack.Screen name="AppStack" component={AppNavigation} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigation;
