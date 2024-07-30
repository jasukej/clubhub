import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import formatEventTime from "@/utils/formatCardEventTime";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import AntDesign from "@expo/vector-icons/AntDesign";

interface EventScreenProps {
  event: any;
  onBack: () => void;
}

const EventScreen = ({ event, onBack }: EventScreenProps) => {
  const { name, description, startTime, endTime, venue, type, field, media } =
    event;

  const imageSource =
    media.length > 0 && media[0] !== ""
      ? { uri: media[0] }
      : require("../../assets/images/placeholder.png");

  return (
    <View className="flex-1 p-4">
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <Image
          source={imageSource}
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />
        <TouchableOpacity onPress={onBack} style={{ padding: 10 }}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "white",
            padding: 16,
          }}
        >
          <Text className="text-2xl font-bold">{name}</Text>
          <Text>{formatEventTime(startTime, endTime)}</Text>
          <Text>{venue}</Text>
          <Text>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventScreen;
