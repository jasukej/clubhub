import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/firebase";

const TitleScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (user !== null) {
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 3000);
      }
      if (hasLaunched === null) {
        await AsyncStorage.setItem("hasLaunched", "true");
        setTimeout(() => {
          router.replace("/welcome/Page1");
        }, 3000);
      } else {
        setTimeout(() => {
          router.replace("/auth");
        }, 3000);
      }
    };

    checkFirstLaunch();
  }, [router]);

  return (
    <View
      className="
        flex-1 
        justify-center 
        items-center"
    >
      <Text
        className="
            text-4xl 
            font-bold"
      >
        clubhub
      </Text>
    </View>
  );
};

export default TitleScreen;

const styles = StyleSheet.create({});
