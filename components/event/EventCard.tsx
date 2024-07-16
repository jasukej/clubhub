import { View, Text, Image } from 'react-native'
import React from 'react'
import HeartButton from './HeartButton';
import formatEventTime from '@/utils/formatCardEventTime';

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
    hostedBy,
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
            by {hostedBy.map((org:any) => org.name).join(' and ')}
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