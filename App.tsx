import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import * as firebase from "firebase/app";
import firebaseConfig from "./services/firebase.js";
import { useFonts } from "expo-font";
import { ContextProvider } from "./context/Context";

firebase.initializeApp(firebaseConfig);

const App = () => {
  let [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter/Inter-SemiBold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter/Inter-Regular.ttf"),
  });
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete && !fontsLoaded) {
    return null;
  } else {
    return (
      <ContextProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ContextProvider>
    );
  }
};

export default App;
