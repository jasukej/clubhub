import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import { useUser } from '@/context/UserContext'

const Profile = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <View>Loading...</View> // replace with loader later
  }

  if (!user) {
    return <Text>User not logged in</Text>;
  }

  const {
    uid,
    fullName,
    username,
    year,
    program,
    bio,
    interests,
    friends,
    execOf,
    image,
    pronouns,
    institution,
    favoritedEvents,
    registeredEvents,
  } = user;

  return (
    <SafeAreaView>
      <View className="flex flex-col space-y-2">
      <View className="flex flex-row">
        <Avatar src={image} size={50}/>
        <View className="flex flex-col">
          <Text>{fullName}</Text>
          {pronouns && <Text>{pronouns}</Text>}
          <Text>{year} @ {institution} {program}</Text>
          <View>{/* see common friends*/}</View>
        </View>
      </View>
      <View>{bio}</View>
      <Text>talk to me about: {interests}</Text>
      <Text>exec @ {execOf}</Text>
      <View>
        <Button 
          label="add friend"
          icon=""
          onPress={() => {}}
          variant="primary" 
        />
        <Button 
          label="message"
          onPress={() => {}}
          variant="secondary" 
        />
      </View>
      </View>
      <View>
        <Text>activity</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile