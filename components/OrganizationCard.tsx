import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface OrganizationCardProps {
    org: Organization;
}

const OrganizationCard = ({org}:OrganizationCardProps) => {
  return (
    <View className="flex flex-col aspect-square items-center">
        <View><Image src={org.logo} className="w-12 h-12"/></View>
        <Text className="text-sm font-bold">{org.name}</Text>
        <Text className="text-xs text-gray-500">{org.description}</Text>
    </View>
  )
}

export default OrganizationCard

const styles = StyleSheet.create({})