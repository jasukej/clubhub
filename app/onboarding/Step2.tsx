import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setProgram, setYear } from '@/onboardingSlice'
import OnboardingPage from './OnboardingPage'
import Input from '@/components/inputs/Input';

interface FormValues {
    year: number,
    program: string,
}

const defaultValues: FormValues = {
    year: 0, 
    program: ''
}

const OnboardingStep2 = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    // selects relevant part of whole Redux store (which is the year and program reducers from onboarding slice)
    const { year, program } = useSelector((state: RootState) => state.onboarding);
    const { control, handleSubmit, formState: { errors }} = useForm<FormValues>({
        defaultValues: {
            year,
            program,
        },
    })

    const onNext = (data: { year: number, program: string }) => {
        dispatch(setYear(data.year));
        dispatch(setProgram(data.program));
        router.push('/onboarding/Step3');
    }

    const onBack = () => {
        router.back();
    }

    const bodyContent = (
        <View>
          <Input 
            label="Year"
            name="year"
            control={control}
            rules={{ required: 'Year is required.' }}
            errors={errors}
          />
          {/* validate year is 1, 2, 3, 4, 5, 6, 7 */}
          <Input
            label="Program of study"
            name="program"
            control={control}
            rules={{ required: 'Username is required.' }}
            errors={errors}
          />
        </View>
      )
    
      return (
        <OnboardingPage
          progress={0.5}
          heading="how about your academics?"
          subheading="Enter your year and program of study."
          bodyContent={bodyContent}
          onNext={handleSubmit(onNext)}
        />
      );
}

export default OnboardingStep2