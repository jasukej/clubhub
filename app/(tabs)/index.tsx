import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { collection, doc, getDocs, where, query } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import { SearchBar } from 'react-native-screens';
import FilterBar from '@/components/FilterBar';
import EventCard from '@/components/EventCard';
import { useEffect, useState } from 'react';

export default function HomeScreen() {

  // simple query for now
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);

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
      const events:any = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      })
      setEvents(events);
    }

    fetchEvents();
  }, [searchQuery]);

  return (
    <View className="flex-1">
      <SearchBar />
      <FilterBar />
      <Text
      className="
        text-2xl
        font-bold
        mt-4
        mb-2
        px-4
      ">
        top picks for you
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
