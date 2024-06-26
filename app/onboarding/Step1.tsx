// OnboardingStep1.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '@/components/inputs/Input';
import Button from '@/components/Button';
import OnboardingPage from './OnboardingPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setFullName, setUsername } from '@/onboardingSlice';

interface FormValues {
  fullName: string;
  username: string;
}

const defaultValues: FormValues = {
  fullName: '',
  username: ''
};

const OnboardingStep1 = () => {
  const router = useRouter();
  // to trigger a state change; point of Redux is that your components never access state directly
  const dispatch = useDispatch();
  const { fullName, username } = useSelector((state: RootState) => state.onboarding) // !!!
  const { control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      fullName,
      username,
    }
  })
  
  const onNext = (data: { fullName:string; username:string}) => {
    // dispatch takes in an ACTIOn to change state in store
    dispatch(setFullName(data.fullName));
    dispatch(setUsername(data.username));
    router.push('/onboarding/Step2');
  }

  const bodyContent = (
    <View>
      <Input 
        label="Full name"
        name="fullName"
        control={control}
        rules={{ required: 'Full name is required.' }}
        errors={errors}
      />
      {/* validate username is unique */}
      <Input
        label="Username"
        name="username"
        control={control}
        rules={{ required: 'Username is required.' }}
        errors={errors}
      />
    </View>
  )

  return (
    <OnboardingPage
      progress={0.25}
      heading="cool. let's get started"
      subheading="Make a unique username."
      bodyContent={bodyContent}
      onNext={handleSubmit(onNext)}
    />
  );
};

export default OnboardingStep1;
