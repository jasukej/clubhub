// app/auth/index.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { discovery } from 'expo-auth-session/build/providers/Facebook';

const AuthLanding = () => {

  // GOOGLE AUTH
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  // FACEBOOK AUTH
  // !!!

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
            disabled={!request}
            onPress={() => promptAsync()}
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
