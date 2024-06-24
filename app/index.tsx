import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TitleScreen = () => {
    const router = useRouter();

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === null) {
                await AsyncStorage.setItem('hasLaunched', 'true');
                setTimeout(() => {
                    router.push('/welcome/Page1');
                }, 3000)
            } else {
                setTimeout(() => {
                    router.push('/home')
                }, 3000)
            }
        }

        checkFirstLaunch();
    }, [router])

  return (
    <View 
    className='
        flex-1 
        justify-center 
        items-center'>
        <Text 
        className="
            text-4xl 
            font-bold">
                clubhub
        </Text>
    </View>
  )
}

export default TitleScreen

const styles = StyleSheet.create({})