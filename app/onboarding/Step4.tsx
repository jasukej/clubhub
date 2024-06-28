import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/store';
import { useForm } from 'react-hook-form';
import { setPartOfAnyClubs } from '@/onboardingSlice';
import { doc, setDoc } from 'firebase/firestore/lite';
import { auth, db } from '@/config/firebase';
import OnboardingPage from './OnboardingPage';
import Input from '@/components/inputs/Input';

const Step4 = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { partOfAnyClubs, ...onboardingData } = useSelector((state: RootState) => state.onboarding)
    const { control, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            partOfAnyClubs,
        },
    });

    const onBack = () => {
        router.back();
    }

    // onNext has only been updating the global state in the onboarding store
    // now we're submitting that data to firebase
    const onSubmit = async (data: { partOfAnyClubs: string[] }) => {
        dispatch(setPartOfAnyClubs(data.partOfAnyClubs));

        if (!auth.currentUser) {
            router.replace('/auth');
            return;
        }

        const userRef = doc(db, 'users', auth.currentUser.uid);
        try {
          await setDoc(userRef, {
              ...onboardingData,
              execOf: data.partOfAnyClubs,
          });
          router.replace('/(tabs)');
        } catch (error) {
          console.error("Couldn't create user.")
        }

    }

  return (
    <OnboardingPage
      progress={0.97}
      heading="final touches..."
      subheading="Do you manage any clubs?"
      bodyContent={
        <Input
          label="Enter clubs you are an exec of:"
          name="partOfAnyClubs"
          control={control}
          errors={errors}
        /> //!!! need to create custom club select input
      }
      onNext={handleSubmit(onSubmit)}
      onBack={onBack}
      isFinalStep
    />
  )
}

export default Step4