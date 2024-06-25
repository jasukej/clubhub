// app/auth/index.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const AuthLanding = () => {
  const router = useRouter();

  return (
    <View 
    className="
        flex-1 
        justify-center 
        items-center 
        bg-whit
        e p-4"
    >
        <Image 
        source={require('../../assets/images/logo_img.png')} 
        style={{ width: 150, height: 150 }} />
        <Text 
        className="
            text-4xl 
            font-bold 
            mt-4">
            clubhub
        </Text>
      <TouchableOpacity
        className="
            bg-black
            text-white 
            rounded-full 
            px-6 
            py-2 
            mt-8"
        onPress={() => router.push('/auth/SignUp')}
      >
        <Text className="text-white">
            Sign up
        </Text>
      </TouchableOpacity>
      <Text className="mt-4">or sign in through</Text>
      <View className="flex-row mt-4">
        <TouchableOpacity 
            className="
            bg-white 
            border 
            rounded-full 
            px-4 
            py-2 
            mx-2">
          <Text>
            <AntDesign name="google" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            className="
            bg-white 
            border 
            rounded-full 
            px-4 
            py-2 
            mx-2">
          <Text>
            <FontAwesome name="facebook-square" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-4">
        Already have an account?{' '}
        <Text 
        className="text-gray-700 underline underline-offset-1" 
        onPress={() => router.push('/auth/LogIn')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

export default AuthLanding;
