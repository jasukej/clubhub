import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import { useUser } from '@/context/UserContext'
import { getDoc } from 'firebase/firestore'
import OrganizationCard from '@/components/OrganizationCard'

const Profile = () => {
  const { user, loading } = useUser();
  const [orgs, setOrgs] = useState<Organization[]>([]);

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
    favoritedIds,
    registeredIds,
  } = user;

  const storageBucket = "clubhub-68525.appspot.com";
  const userId = uid;
  const imgUrl = `gs://${storageBucket}/users/${userId}/images/avatar.jpg`;

  useEffect(() => {
    const getOrgsById = async () => {
      try {
        if (user && execOf) {
          console.log(execOf);
          const orgDetails: Organization[] = [];
          
          // given execOf is an array of organizationIds (document ids), how do I query all organizations and render them from 'organizations' collection

          console.log(orgDetails);
          setOrgs(orgDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrgsById();
  }, [user]);

  return (
    <SafeAreaView className="px-8 pt-10">
      <ScrollView>
        <View className="flex flex-col gap-y-2">
          <View className="flex flex-row items-center gap-x-4">
            <Avatar src={imgUrl} size={50} />
            <View>
              <Text className="text-3xl font-bold">{fullName}</Text>
              {pronouns && <Text className="text-sm text-gray-500">{pronouns}</Text>}
              <Text className="text-sm text-gray-500">
                {year} @ {program}
              </Text>
            </View>
          </View>
          <Text className="text-base">{bio}</Text>
          {interests && <Text className="text-sm">Talk to me about: {interests.slice(0, 2).join(', ')}, more</Text>}
          <Text className="text-sm">Exec @ {orgs.map((org) => (org.name)).join(', ')}</Text>
          <View className="flex flex-row flex-wrap space-x-2 space-y-2">
            {orgs.map((org, index) => (
              <OrganizationCard key={index} org={org} />
            ))}
            <View className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-full">
              <Text className="text-xs text-gray-500">Add</Text>
            </View>
          </View>
          <View className="flex flex-row space-x-4">
            <Button label="Add Friend" onPress={() => {}} variant="primary" />
            <Button label="Message" onPress={() => {}} variant="secondary" />
          </View>
          <View className="gap-y-4">
            <Text className="text-2xl font-bold">activity</Text>
            {/* Filler activity items */}
            <View className="mt-2">
              <Text>Lilian added feedback to Intro to SQL</Text>
              <Text className="text-sm text-gray-500">
                Great, comprehensive workshop! The exercises were far too hard for beginners though.
              </Text>
            </View>
            <View className="mt-2">
              <Text>Lilian attended Intro to SQL</Text>
            </View>
            <View className="mt-2">
              <Text>Lilian is going to ProduHacks 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile