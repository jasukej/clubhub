import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "@/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { Provider } from 'react-redux';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            // if exists, check that the neccessary fields exist to redirect to tabs view
            const userData = userDoc.data();
            console.log(userData);
            const requiredFields = ['fullName', 'username', 'year', 'program'];

            if (requiredFields.every(field => userData[field])) {
              setUser(user);
              router.replace('/(tabs)');
            } else {
              router.replace('/onboarding/Step1');
            }
          } 
        } else {
          setUser(user)
          router.replace('/auth');
        }
    });

    return () => unsubscribe();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </Provider>
  );
}
