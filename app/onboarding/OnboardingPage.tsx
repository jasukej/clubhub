import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

interface OnboardingPage {
    progress: number;
    heading: string;
    subheading: string;
    bodyContent: React.ReactNode;
    onNext: () => void;
    onBack?: () => void;
    isFinalStep?: boolean
}

const OnboardingPage = ({
    progress,
    heading,
    subheading,
    bodyContent,
    onNext,
    onBack,
    isFinalStep
}:OnboardingPage) => {

    const router = useRouter();

  return (
    <TouchableWithoutFeedback 
      className="relative min-h-screen"
      onPress={() => {Keyboard.dismiss()}} 
      accessible={false}>
    <View 
    className="
      relative
      min-h-screen">
      <ProgressBar
        progress={progress}
        color='#3954E4'
        className="absolute bottom-0 w-full"
      />
    <View 
    className="
      flex 
      flex-col 
      p-4 
      pt-[12vh]
      px-10
      gap-y-4

    ">
      <Text className="text-4xl font-bold mb-2">
        {heading}
      </Text>
      <Text className="text-md font-light mb-4">
        {subheading}
      </Text>
      {bodyContent}
      <View 
        className="
        flex
        flex-row
        justify-between
        mt-4
        space-x-2"
        >
        {onBack && (
            <Button 
                variant="outline"
                label="Back"
                onPress={onBack}
                className="flex-1 mr-2"
            />
        )}
        <Button 
            variant="primary"
            label={isFinalStep ? 'Submit' : 'Next'}
            onPress={onNext}
            className="flex-1 ml-2"
        />
      </View>
    </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default OnboardingPage