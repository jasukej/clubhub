import { View, Text, Image } from 'react-native'
import React from 'react'
import HeartButton from './HeartButton';

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

  return (
    <View 
    className="
    border
    border-blue
    rounded-md
    w-full
    relative
    p-6
    ">
      <HeartButton />
      <View
      className="
        flex
        flex-row
        
      ">
        <View>
          <Image 
            src={media.length > 0 ? media[0] : "/assets/placeholder.png"}
          />
        </View>
        <View
        className="
          flex
          flex-col
          gap-y-2
          text-blue
        ">
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
            {startTime} - {endTime} {/* !!! custom hook to format time */}
          </Text>
          <Text>
            {/* !!! logic for querying friends only from attendees */}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default EventCard