import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import formatEventTime from "@/utils/formatCardEventTime";
import { db } from "@/config/firebase";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUser } from "@/context/UserContext";
import RegisterButton from "./RegisterButton";

interface EventScreenProps {
  event: any;
  currentUser?: any;
  onBack: () => void;
}

const EventScreen = ({ event, currentUser, onBack }: EventScreenProps) => {
  const { user } = useUser();
  const { name, description, startTime, endTime, venue, type, field, media } =
    event;

  const imageSource =
    media.length > 0 && media[0] !== ""
      ? { uri: media[0] }
      : require("../../assets/images/placeholder.png");

  return (
    <View className="flex-1 p-4">
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <TouchableOpacity onPress={onBack} style={{ padding: 10 }}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={imageSource}
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />

        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            marginBottom: 10,
          }}
        >
          <Text className="text-3xl font-bold text-blue">{name}</Text>
          <Text className="text-blue">
            {formatEventTime(startTime, endTime)}
          </Text>
          <Text></Text>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={{ fontWeight: "bold", color: "blue", width: 80 }}>
              Desc:
            </Text>
            <Text style={{ color: "blue", flex: 1 }}>{description}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "blue", width: 80 }}>
              Venue:
            </Text>
            <Text style={{ color: "blue", flex: 1 }}>{venue}</Text>
          </View>
          <RegisterButton eventId={event.id} currentUser={user} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EventScreen;
