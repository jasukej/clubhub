import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import { useUser } from '@/context/UserContext';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import EventCard from '@/components/event/EventCard';
import { Label, ToggleGroup, XStack, YStack } from 'tamagui';
import { Star, CheckSquare } from '@tamagui/lucide-icons';

const events = () => {

  const { user, loading } = useUser();
  const [registered, setRegisteredEvents] = useState<EventObj[]>();
  const [favorited, setFavoritedEvents] = useState<EventObj[]>();
  const [viewing, setViewing] = useState('registered');

  useEffect(() => {
    if (!user || loading) return;

    const fetchEvents = async () => {
      if (user.registeredIds?.length) {
        const q = query(
          collection(db, 'events'),
          where('__name__', 'in', user.registeredIds)
        );

        const snapshot = await getDocs(q);
        const registeredEvents = snapshot.docs.map(doc => doc.data());
        setRegisteredEvents(registeredEvents);
      }

      if (user.favoritedIds?.length) {
        const q = query(
          collection(db, 'events'),
          where('__name__', 'in', user.favoritedIds)
        );

        const snapshot = await getDocs(q);
        const favoritedEvents = snapshot.docs.map(doc => doc.data());
        setFavoritedEvents(favoritedEvents);
      }
    };

    fetchEvents();
  }, [user, loading]);

  return (
    <SafeAreaView 
      className="
        flex-1 
        bg-white">
    <View className="flex-1 pt-4 px-6">
      <Text>your events</Text>
      <XStack alignItems="center" space="$4">
        <Label>Toggle View:</Label>
        <ToggleGroup
          orientation="horizontal"
          type="single"
          value={viewing}
          onValueChange={(value) => setViewing(value)}
        >
          <ToggleGroup.Item value="registered" aria-label="Registered Events">
            <CheckSquare />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="favorited" aria-label="Favorited Events">
            <Star />
          </ToggleGroup.Item>
        </ToggleGroup>
      </XStack>
      <View>
        <FlatList
          data={viewing === 'favorited' ? favorited : registered}
          renderItem={({ item }) => <EventCard currentUser={user} event={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
    </SafeAreaView>
  )
}

export default events