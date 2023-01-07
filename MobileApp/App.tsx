import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { Asset } from "expo-asset";
import React from "react";
import * as SplashScreen from "expo-splash-screen";

import * as SecureStore from "expo-secure-store";

import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store/store";
import { setCredentials } from "./redux/slices/authSlice";

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image == "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [appReady, setAppReady] = React.useState(false);

  React.useEffect(() => {
    async function loadAssetsAsync() {
      try {
        const imageAssets = cacheImages([
          require("./assets/cocktail-image-1.png"),
          require("./assets/cocktail-image-2.png"),
          require("./assets/cocktail-image-3.png"),
          require("./assets/cocktail-image-4.png"),
          require("./assets/welcomeVideo.mp4"),
          require("./assets/logo-dark.png"),
          require("./assets/logo-light.png"),
        ]);
        await Promise.all([...imageAssets]);
      } catch (error) {
        console.warn(error);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    loadAssetsAsync();
  }, []);

  if (!appReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
