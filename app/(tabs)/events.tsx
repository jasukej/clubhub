import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "@/config/firebase";
import { useUser } from "@/context/UserContext";
import EventCard from "@/components/event/EventCard";
import EventScreen from "@/components/event/EventScreen";
import NoEventsView from "@/components/event/NoEventsView";
import SearchBar from "@/components/homepage/SearchBar";

interface EventObj {
  id: string;
  name: string;
  applicationNeeded: boolean;
  attendees: any;
  cost: number;
  description: string;
  createdAt: Date;
  ended: Date;
  field: string;
  organizationId: string;
  instagramLink: string;
  media: string[];
  rsvpLink: string;
  startTime: Date;
  endTime: Date;
  type: string;
  venue: string;
}

const Events = () => {
  const { user, loading, refreshUser } = useUser();
  const [registered, setRegisteredEvents] = useState<EventObj[]>();
  const [favorited, setFavoritedEvents] = useState<EventObj[]|null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewing, setViewing] = useState("registered");
  const [selectedEvent, setSelectedEvent] = useState<EventObj | null>(null);

  useEffect(() => {
    console.log("EventScreen currentUser:", user);

    if (!user) return;

    const fetchEvents = async () => {
      try {
        if (user.registeredIds?.length) {
          const q = query(
            collection(db, "events"),
            where("__name__", "in", user.registeredIds)
          );

          const snapshot = await getDocs(q);
          const registeredEvents = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              startTime: data.startTime.toDate(),
              endTime: data.endTime.toDate(),
            } as EventObj;
          });
          setRegisteredEvents(registeredEvents);
        }

        if (user.favoritedIds?.length) {
          const q = query(
            collection(db, "events"),
            where("__name__", "in", user.favoritedIds)
          );
          console.log("favourited event ids:", user.favoritedIds)

          const snapshot = await getDocs(q);
          const favoritedEvents = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              startTime: data.startTime.toDate(),
              endTime: data.endTime.toDate(),
            } as EventObj;
          });
          setFavoritedEvents(favoritedEvents);
        } else {
          setFavoritedEvents(null);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user, loading]);

  const onEventPress = (event: EventObj) => {
    setSelectedEvent(event);
  };

  const onBackPress = () => {
    setSelectedEvent(null);
  };

  if (selectedEvent) {
    return (
      <EventScreen
        event={selectedEvent}
        currentUser={user}
        onBack={onBackPress}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pt-4 px-6">
      <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        <View className="flex-row flex justify-between mt-4">
          <Text className="text-2xl font-bold mb-4">my events</Text>
          <View className="flex-row max-h-9">
            <TouchableOpacity
              className={`px-3 py-2 flex items-center rounded-lg ${
                viewing === "registered" ? "bg-blue" : "bg-gray-300"
              }`}
              onPress={() => setViewing("registered")}
            >
              <Text className="text-white">registered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-2 ml-2 flex items-center rounded-lg ${
                viewing === "favorited" ? "bg-blue" : "bg-gray-300"
              }`}
              onPress={() => setViewing("favorited")}
            >
              <Text className="text-white">favorited</Text>
            </TouchableOpacity>
          </View>
        </View>
        {favorited ?
        <FlatList
          data={viewing === "favorited" ? favorited : registered}
          renderItem={({ item }) => (
            <EventCard
              currentUser={user}
              event={item}
              refresh={refreshUser}
              onPress={() => onEventPress(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        /> : 
        <View className="flex items-center min-h-[70vh]">
          <NoEventsView />
        </View>}
        <TouchableOpacity
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mt-4"
          onPress={() => {}}
        >
          <Text className="text-white text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Events;
