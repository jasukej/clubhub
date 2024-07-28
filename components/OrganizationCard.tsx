import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface OrganizationCardProps {
    org: Organization;
}

const OrganizationCard = ({org}:OrganizationCardProps) => {
  return (
    <View className="border-[1px] w-40 h-40 aspect-square p-4 overflow-hidden rounded-lg">
        <View className="flex flex-col">
            <Text className="font-bold text-md">{org.name}</Text>
            <Text className="text-xs truncate max-w-8 wra">{org.description}</Text>
        </View>
    </View>
  )
}

export default OrganizationCard

const styles = StyleSheet.create({})