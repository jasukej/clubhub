import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

interface WelcomePageProps {
    subheading: string,
    paragraph: string,
    // illustration: string,
    currentPage: number,
    totalPages: number,
    nextPage: string,
    isLastPage: boolean
}

const WelcomePage = ({
    subheading,
    paragraph,
    // illustration,
    currentPage,
    totalPages,
    nextPage,
    isLastPage
}:WelcomePageProps) => {
    const router = useRouter();
  return (
    <View 
    className="
        flex-1 
        justify-center 
        items-center 
        bg-white 
        p-4"
    >
        <TouchableOpacity
        className="mt-4" 
        onPress={() => router.replace('/auth')}>
            Skip
        </TouchableOpacity>
        <Text className="text-3xl font-bold">
            Welcome to Clubhub
        </Text>
        <Text className="text-xl mt-4">
            {subheading}
        </Text>
        <Text>
            {paragraph}
        </Text>
        <View 
        className="
            flex-row
            flex
            mt-4
        ">
            {Array.from({ length: totalPages }).map((_, index) => (
          <View key={index} className={`h-2 w-2 mx-1 rounded-full ${index === currentPage ? 'bg-blue-500' : 'bg-gray-300'}`} />
            ))}
        </View>
        <Button title={isLastPage ? "Get Started" : "Next"} onPress={() => router.push(nextPage)} />
    </View>
  )
}

export default WelcomePage

const styles = StyleSheet.create({})