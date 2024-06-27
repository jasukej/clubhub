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
    year: string,
    program: string,
}

const defaultValues: FormValues = {
    year: '', 
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

    const onNext = (data: { year: string, program: string }) => {
        dispatch(setYear(data.year));
        dispatch(setProgram(data.program));
        router.push('/onboarding/Step3');
    }

    const onBack = () => {
        router.back();
    }

    const currentYear = new Date().getFullYear();
    const validYears = Array.from({ length: 8 }, (_, i) => (currentYear + i).toString());

    const bodyContent = (
        <View>
          <Input 
            label="Expected graduation year"
            name="year"
            control={control}
            rules={{ 
                required: 'Year is required.',
                validate: (value:string) => validYears.includes(value) || 'Year must be between 1 and 7.'
            }}
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
          onBack={onBack}
        />
      );
}

export default OnboardingStep2