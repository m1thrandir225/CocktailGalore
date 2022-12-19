import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import AppNavigation from "./Home/AppNavigation";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";

export default function Navigation() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <NavigationContainer>
      {loggedIn ? <AppNavigation /> : <WelcomeNavigation />}
    </NavigationContainer>
  );
}
