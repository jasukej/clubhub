import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  doc,
  getDocs,
  where,
  query,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "@/config/firebase";
import FilterBar from "@/components/homepage/FilterBar";
import EventCard from "@/components/event/EventCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LocationBar from "@/components/homepage/LocationBar";
import SearchBar from "@/components/homepage/SearchBar";
import { useUser } from "@/context/UserContext";
import EventScreen from "@/components/event/EventScreen";
import { DatePickerModal } from 'react-native-paper-dates';
import Button from "@/components/Button";
import { format } from "date-fns";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import NoEventsView from "@/components/event/NoEventsView";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import AddEventForm from "@/components/event/AddEventForm";

interface Event {
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

export default function HomeScreen() {
  // simple query for now
  const { user, refreshUser } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventObj | null>(null);

  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    //@ts-ignore
    ({ startDate, endDate }) => {
      setOpen(false);
      setStartDate(startDate);
      setEndDate(endDate);
    },
    [setOpen, setStartDate, setEndDate]
  );

  console.log(events);

  useEffect(() => {
    console.log("HomeScreen currentUser:", user);

    const fetchEvents = async () => {
      let q;
      if (searchQuery) {
        const eventsRef = collection(db, "events");
        q = query(
          eventsRef,
          where("name", ">=", searchQuery),
          where("name", "<=", searchQuery + "\uf8ff")
        );
      } else {
        q = query(collection(db, "events"));
      }
      
      // Having problems
      if (startDate && endDate) {
        q = query(q, where("startTime", ">=", Timestamp.fromDate(startDate)), where("endTime", "<=", Timestamp.fromDate(endDate)));
      }

      console.log(q);

      const querySnapshot = await getDocs(q);
      const eventsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          applicationNeeded: data.applicationNeeded,
          attendees: data.attendees,
          cost: data.cost,
          description: data.description,
          createdAt: data.createdAt.toDate(),
          ended: data.ended,
          field: data.field,
          organizationId: data.organizationId,
          instagramLink: data.instagramLink,
          media: data.media,
          rsvpLink: data.rsvpLink,
          startTime: data.startTime.toDate(),
          endTime: data.endTime.toDate(),
          type: data.type,
          venue: data.venue,
        };
      });

      setEvents(eventsList);
    };

    fetchEvents();
  }, [searchQuery, startDate, endDate]);

  const onEventPress = (event: EventObj) => {
    setSelectedEvent(event);
  };

  const onBackPress = () => {
    setSelectedEvent(null);
  };

  if (selectedEvent) {
    return <EventScreen event={selectedEvent} onBack={onBackPress} />;
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['95%', '95%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <SafeAreaView
      className="
        flex-1 
        bg-white"
    >
      <View className="flex-1 relative pt-4 px-6">
        <View
          className="
        flex 
        space-y-4
        mb-6
        ">
          <LocationBar />
          <View>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <View className="flex-row flex justify-between">
            <View className="mt-2">
              <Text className="font-light text-neutral-500">Events happening during</Text>
              <Text className="text-sm font-semibold text-blue-dark ">{startDate && endDate ? 
                `${format(startDate, "d MMMM yyyy")} - ${format(endDate, "d MMMM yyyy")}` 
                : "Anytime"}
              </Text>
            </View>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              label="" 
              onPress={() => setOpen(true)} 
              variant="primary"
              noFlex
            />
          </View>
          </View>
          <DatePickerModal
            visible={open}
            onDismiss={onDismiss}
            locale="en"
            mode="range"
            startDate={startDate}
            endDate={endDate}
            onConfirm={onConfirm}
            label="Pick A Date Range"
          />
        </View>
        {events.length > 0 ? 
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              currentUser={user}
              refresh={refreshUser}
              event={item}
              onPress={() => onEventPress(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="flex"
        /> : 
        <NoEventsView />
        }
      </View>
      <TouchableOpacity 
        onPress={handlePresentModalPress}
        className="flex justify-center aspect-square items-center p-5 shadow-md bg-blue rounded-full absolute right-6 bottom-6">
        <FontAwesome6 name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Component */}
      <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            maxDynamicContentSize={100}
            keyboardBehavior="interactive"
            backgroundStyle={{
              borderTopWidth: 1,
              borderTopColor: 'grey',
            }}
          >
          <BottomSheetView>
            <View className="flex flex-col px-6 py-2">
            <Text className="font-bold text-xl mb-2">Create an event </Text>
            {/* Create events form */}
            
            <AddEventForm 
              //@ts-ignore
              currentUser={user} />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
    </SafeAreaView>
  );
}
