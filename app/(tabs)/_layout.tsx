import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Animated } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#D9D9D9',
        tabBarStyle: { 
          backgroundColor: '#3A4DB5',
          paddingBottom: 38,
          paddingTop: 0,
          minHeight: 100
        },
        tabBarLabelStyle: { paddingBottom: 8 },
        headerShown: false,
        tabBarIconStyle: { position: 'relative' },
      }}>
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', position: 'relative', minHeight: '100%' }}>
              {focused && <Animated.View style={{ 
                position: 'absolute', 
                top: 0, 
                width: '100%', 
                height: 4, 
                backgroundColor: 'white',
                }} />}
              <MaterialCommunityIcons style={{paddingTop: 12}} name={focused ? 'account-group' : 'account-group-outline'} color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', position: 'relative', minHeight: '100%' }}>
              {focused && <Animated.View style={{ 
                position: 'absolute', 
                top: 0, 
                width: '100%', 
                height: 4, 
                backgroundColor: 'white'
                }} />}
              <MaterialCommunityIcons style={{paddingTop: 12}} name={focused ? 'account-multiple' : 'account-multiple-outline'} color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', position: 'relative', minHeight: '100%' }}>
              {focused && <Animated.View style={{ position: 'absolute', top: 0, width: '100%', height: 4, backgroundColor: 'white' }} />}
              <MaterialCommunityIcons style={{paddingTop: 12}} name={focused ? 'home' : 'home-outline'} color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', position: 'relative' }}>
              {focused && <Animated.View style={{ position: 'absolute', top: 0, width: '100%', height: 4, backgroundColor: 'white' }} />}
              <MaterialCommunityIcons style={{paddingTop: 12}} name={focused ? 'calendar' : 'calendar-outline'} color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', position: 'relative' }}>
              {focused && <Animated.View style={{ position: 'absolute', top: 0, width: '100%', height: 4, backgroundColor: 'white' }} />}
              <MaterialCommunityIcons style={{paddingTop: 12}} name={focused ? 'account' : 'account-outline'} color={color} size={30} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}