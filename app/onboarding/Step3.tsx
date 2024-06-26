import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setInterests, setProgram, setYear } from '@/onboardingSlice'
import OnboardingPage from './OnboardingPage'
import Input from '@/components/inputs/Input';
import InterestsInput from '@/components/inputs/InterestsInput'

interface FormValues {
    interests: string[]
}

const defaultValues: FormValues = {
    interests: []
}

const OnboardingStep3 = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    // selects relevant part of whole Redux store (which is the year and program reducers from onboarding slice)
    const { interests } = useSelector((state: RootState) => state.onboarding);
    const { control, handleSubmit, setValue, watch} = useForm<FormValues>({
        defaultValues: {
            interests,
        },
    })

    const watchedInterests = watch('interests');

    const onNext = (data: { interests: string[] }) => {
        dispatch(setInterests(data.interests));
        router.push('/onboarding/Step4');
    }

    const onBack = () => {
        router.back();
    }

    const bodyContent = (
        <View>
          <Controller 
            control={control}
            name="interests"
            render={({ field: { onChange, value } }) => (
                <InterestsInput
                    selectedInterests={value}
                    onChange={onChange}
                />
            )
            }
          />
        </View>
      )
    
      return (
        <OnboardingPage
          progress={0.75}
          heading="nice! a bit more..."
          subheading="Tell us about your interests."
          bodyContent={bodyContent}
          onNext={handleSubmit(onNext)}
          onBack={onBack}
        />
      );
}

export default OnboardingStep3