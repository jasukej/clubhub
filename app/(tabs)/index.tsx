import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { collection, doc, getDocs, where, query } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import { SearchBar } from 'react-native-screens';
import FilterBar from '@/components/homepage/FilterBar';
import EventCard from '@/components/event/EventCard';
import { useEffect, useState } from 'react';
import LocationBar from '@/components/homepage/LocationBar';

interface Event {
  name: string,
  applicationNeeded: boolean,
  attendees: any,
  cost: number,
  description: string,
  createdAt: Date,
  ended: Date,
  field: string,
  hostedBy: any,
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
  const [searchQuery, setSearchQuery] = useState('');
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
          hostedBy: data.hostedBy,
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
    <View className="flex-1">
      <View>
        <LocationBar />
        <SearchBar />
        <FilterBar />
      </View>
      <Text
      className="
        text-2xl
        font-bold
        mt-4
        mb-2
        px-4
      ">
        top picks for you
        <ScrollView 
        className="
          flex
          flex-col
          gap-y-4
        "
        contentContainerStyle={{ paddingBottom: 100 }}>
          {events.map((evt, index) => (
            <EventCard
              key={index}
              event={evt}
            />
          ))}
        </ScrollView>
      </Text>
    </View>
  );
}
