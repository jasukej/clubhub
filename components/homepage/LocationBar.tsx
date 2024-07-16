import { View, Text } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import React from 'react'

const LocationBar = () => {
  return (
    <View className="flex flex-row gap-x-2 mb-2">
      <EvilIcons name="location" size={24} color="black" />
      <Text>University of British Columbia</Text>
    </View>
  )
}

export default LocationBar