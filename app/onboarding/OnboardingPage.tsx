import { View, Text } from 'react-native'
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
    <View>
        <ProgressBar
            progress={progress}
            color={'#0000FF'}
            className="absolute bottom-0 w-full"
        />
      <Text className="text-2xl font-bold">
        {heading}
      </Text>
      <Text className="text-lg mb-4">
        {subheading}
      </Text>
      {bodyContent}
      <View 
        className="
        flex-row 
        mt-4
        gap-x-2"
        >
        {onBack && (
            <Button 
                variant="outline"
                label="Back"
                onPress={onBack}
            />
        )}
        <Button 
            variant="primary"
            label={isFinalStep ? 'Submit' : 'Next'}
            onPress={onNext}
        />
      </View>
    </View>
  )
}

export default OnboardingPage