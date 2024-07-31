import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react'

const NoEventsView = () => {
  return (
    <View className="min-h-fit mt-48 items-center flex flex-col space-y-8">
        <FontAwesome name="calendar-times-o" size={100} color="#D0D0D0" />
        <Text className="text-[#afafaf] font-lg">No events found.</Text>
    </View>
  )
}

export default NoEventsView

const styles = StyleSheet.create({})