import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  Raleway_400Regular,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

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

  //load fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  React.useEffect(() => {
    async function loadAssetsAsync() {
      try {
        const imageAssets = cacheImages([
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

  if (!appReady || !fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<Text> Loading ... </Text>} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
