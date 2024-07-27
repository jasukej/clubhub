import { Image, StyleSheet, Platform, View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { collection, doc, getDocs, where, query } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import FilterBar from '@/components/homepage/FilterBar';
import EventCard from '@/components/event/EventCard';
import { useEffect, useState } from 'react';
import LocationBar from '@/components/homepage/LocationBar';
import SearchBar from '@/components/homepage/SearchBar';
import { useUser } from '@/context/UserContext';

interface Event {
  id: string,
  name: string,
  applicationNeeded: boolean,
  attendees: any,
  cost: number,
  description: string,
  createdAt: Date,
  ended: Date,
  field: string,
  organizationId: string,
  instagramLink: string,
  media: string[],
  rsvpLink: string,
  startTime: Date,
  endTime: Date,
  type: string,
  venue: string
}

export default function HomeScreen() {

  // simple query for now
  const { user, loading } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  console.log(events);

  useEffect(() => {
    const fetchEvents = async () => {
      let q;
      if (searchQuery) {
        const eventsRef = collection(db, 'events');
        q = query(
          eventsRef, 
          where('name', '>=', searchQuery), 
          where('name', '<=', searchQuery + '\uf8ff')
        );
      } else {
        q = query(collection(db, 'events'));
      }

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
        }
      });

      setEvents(eventsList);
    }

    fetchEvents();
  }, [searchQuery]);

  return (
    <SafeAreaView 
      className="
        flex-1 
        bg-white">
    <View className="flex-1 pt-4 px-6">
      <View className="
        flex 
        space-y-4">
        <LocationBar />
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <FilterBar onDateChange={(date) => setSelectedDate(date.toDate())}/>
      </View>
      <Text
      className="
        text-2xl
        font-bold
        mt-4
        mb-4
      ">
        top picks for you
      </Text>
        <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard currentUser={user} event={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex"
      />
    </View>
    </SafeAreaView>
  );
}
