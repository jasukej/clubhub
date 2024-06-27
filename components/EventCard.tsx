import { View, Text } from 'react-native'
import React from 'react'

interface EventCardProps {
    event: any
}

const EventCard = ({event}:EventCardProps) => {
  return (
    <View 
    className="
    border
    border-blue
    rounded-md
    w-full
    p-6
    ">
      <Text>EventCard</Text>
    </View>
  )
}

export default EventCard