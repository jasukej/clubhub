import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import { useUser } from '@/context/UserContext';
import EventCard from '@/components/event/EventCard';

const Events = () => {
  const { user, loading } = useUser();
  const [registered, setRegisteredEvents] = useState<EventObj[]>();
  const [favorited, setFavoritedEvents] = useState<EventObj[]>();
  const [viewing, setViewing] = useState('registered');

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      if (user.registeredIds?.length) {
        const q = query(
          collection(db, 'events'),
          where('__name__', 'in', user.registeredIds)
        );

        const snapshot = await getDocs(q);
        const registeredEvents = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            startTime: data.startTime.toDate(),
            endTime: data.endTime.toDate(),
          } as EventObj;
        });
        setRegisteredEvents(registeredEvents);
      }

      if (user.favoritedIds?.length) {
        const q = query(
          collection(db, 'events'),
          where('__name__', 'in', user.favoritedIds)
        );

        const snapshot = await getDocs(q);
        const favoritedEvents = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            startTime: data.startTime.toDate(),
            endTime: data.endTime.toDate(),
          } as EventObj;
        });
        setFavoritedEvents(favoritedEvents);
      }
    };

    fetchEvents();
  }, [user, loading]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pt-4 px-6">
        <View className="flex-row flex justify-between">
        <Text className="text-2xl font-bold mb-4">events</Text>
        <View className="flex-row max-h-9">
            <TouchableOpacity 
              className={`px-3 py-2 flex items-center rounded ${viewing === 'registered' ? 'bg-blue' : 'bg-gray-300'}`}
              onPress={() => setViewing('registered')}
            >
              <Text className="text-white">Registered</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-3 py-2 ml-2 flex items-center rounded ${viewing === 'favorited' ? 'bg-blue' : 'bg-gray-300'}`}
              onPress={() => setViewing('favorited')}
            >
              <Text className="text-white">Favorited</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={viewing === 'favorited' ? favorited : registered}
          renderItem={({ item }) => <EventCard currentUser={user} event={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <TouchableOpacity 
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mt-4"
          onPress={() => {}}
        >
          <Text className="text-white text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Events;
