// OnboardingStep1.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface FormValues {
  firstName: string;
  lastName: string;
  displayName: string;
}

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  displayName: ''
};

const OnboardingStep1 = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues
  });

  const onSubmit = (values: FormValues) => {
    // Save the values to the user's profile in Firestore
    // Redirect to the next onboarding step
    router.push('/onboarding/Step2');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold">cool. let’s get started!</Text>
      <Input
        label="First Name"
        placeholder="First"
        control={control}
        name="firstName"
        rules={{ required: 'Please enter your first name' }}
        errors={errors}
      />
      <Input
        label="Last Name"
        placeholder="Last"
        control={control}
        name="lastName"
        rules={{ required: 'Please enter your last name' }}
        errors={errors}
      />
      <Input
        label="Display Name"
        placeholder="display name"
        control={control}
        name="displayName"
        rules={{ required: 'Please enter a display name' }}
        errors={errors}
      />
      <Button
        variant="primary"
        label="Next"
        onPress={handleSubmit(onSubmit)}
        className="mt-4"
      />
    </View>
  );
};

export default OnboardingStep1;
