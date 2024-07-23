import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect, useState } from "react";
import "react-native-reanimated";
import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "@/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { Provider } from 'react-redux';
import { UserContext, UserContextType } from "@/context/UserContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {

    const fetchUserFromStore = async () => {
      const storedUser = await SecureStore.getItemAsync('user');
      console.log(storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }

    fetchUserFromStore();

    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // if exists, check that the necessary fields exist to redirect to tabs view
          const userData = userDoc.data() as User;
          console.log(userData);
          const requiredFields = [
            'fullName', 
            'username', 
            'year', 
            'program'
          ];

          const isValid = requiredFields.every(field => {
            if (field === 'year') {
              return userData[field] && parseInt(userData[field]) > 2024;
            }
            //@ts-ignore
            return userData[field].trim() !== '';
          });

          console.log(isValid)

          if (isValid) {
            setUser({ ...userData });
            await SecureStore.setItemAsync('user', JSON.stringify(userData));
            router.replace('/(tabs)');
          } else {
            router.replace('/onboarding/Step1');
          }
        } else {
          router.replace('/onboarding/Step1');
        }
      } else {
        setUser(null);
        await SecureStore.deleteItemAsync('user');
        router.replace('/(tabs)');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!loaded) {
    return null;
  }

  /**
   * simple login function
   * @param email user email 
   * @param password user password (unencrypted)
   */
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;
      const userRef = doc(db, 'users', authUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserContextType['user'];
        setUser(userData);
        await SecureStore.setItemAsync('user', JSON.stringify({ uid: authUser.uid, ...userData }));
        router.replace('/(tabs)');
      }

    } catch (error) {
      console.log('Unable to log in: ', error);
    }
  }

  /**
   * simple function to log user out
   */
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      await SecureStore.deleteItemAsync('user');
      router.replace('/auth');
    } catch (error) {
      console.error('Unable to log out.', error);
    }
  };

  return (
    <UserContext.Provider value = {{ user, loading, login, logout}}>
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </Provider>
    </UserContext.Provider>
  );
}
