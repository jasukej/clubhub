import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeartButton from './HeartButton';
import formatEventTime from '@/utils/formatCardEventTime';
import { db } from '@/config/firebase';
import { collection, doc, getDoc } from 'firebase/firestore/lite';

interface EventCardProps {
    event: any,
    currentUser?: any
}

const EventCard = ({
  event, 
  currentUser
}:EventCardProps) => {

  const {
    name,
    applicationNeeded,
    attendees,
    cost,
    description,
    createdAt,
    ended,
    field,
    organizationId,
    instagramLink,
    media,
    rsvpLink,
    startTime,
    endTime,
    type,
    venue
  } = event;

  const imageSource = media.length > 0 && media[0] != ""
  ? { uri: media[0] } 
  : require('../../assets/images/placeholder.png');

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const orgRef = doc(db, 'organizations', organizationId);
        console.log(orgRef);
        const orgSnap = await getDoc(orgRef);
        console.log(orgSnap.data());

        setOrg(orgSnap.data());

      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  const [org, setOrg] = useState<any>(null);
  console.log("currentUser is:", currentUser);

  return (
    <View 
    className="
    border-blue
    border-[1.2px]
    rounded-md
    w-full
    relative
    p-4
    bg-white
    shadow-sm
    ">
      <View
      className="
        absolute
        top-4
        left-4
      ">
        <HeartButton 
          eventId={event.id} 
          currentUser={currentUser}
        />
      </View>
      <View
      className="
        flex
        flex-row
        gap-x-2
      ">
        <View>
        <Image 
            source={imageSource}
            style={{ width: 100, height: 100, borderRadius: 8 }} // Adjust size and styling as needed
          />
        </View>
        <View
        className="
          flex
          flex-col
          gap-y-1
          text-blue
        ">
          <Text className="text-blue">
           {formatEventTime(event.startTime, event.endTime)}{/* !!! custom hook to format time */}
          </Text>
          <Text
          className="
            text-xl
            font-bold
          ">
            {name}
          </Text>
          <Text
          className="
            text-md
            font-semibold
          ">
            by {org ? org.name : "Loading..."}
          </Text>
          <Text>
            <Text 
            className="
            text-sm 
            text-gray-500">{attendees.length} attendees</Text>
            {/* !!! logic for querying friends only from attendees */}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default EventCard