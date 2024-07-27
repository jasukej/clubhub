import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import FriendCard from '@/components/FriendCard';

const Friends = () => {
  const {user, loading} = useUser();
  const [friends, setFriends] = useState<User[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      if (user && user.friends && user.friends.length > 0) {
        const q = query(collection(db, 'users'), where('uid', 'in', user.friends));
        console.log(q);
        try {
          const querySnapshot = await getDocs(q);
          const friendsList = querySnapshot.docs.map(doc => doc.data());
          setFriends(friendsList);
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      }
    };

    fetchFriends();
  }, [user]);

  return (
    <SafeAreaView 
      className="
        flex-1 
        bg-white">
    <View className="flex-1 pt-4 px-6">
    <Text
      className="
        text-2xl
        font-bold
        mt-4
        mb-4
    ">
      your friends ({friends.length})
    </Text>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <FriendCard 
              key={index}
              friend={friend}
            />
          ))
        ) : load ? (
          <Text>Loading</Text>
        ) : (
          <Text>No friends found.</Text>
        )}
    </View>
    </SafeAreaView>
  )
}

export default Friends