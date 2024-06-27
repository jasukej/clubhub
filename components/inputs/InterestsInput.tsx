interface InterestsInputProps {
    selectedInterests: string[],
    onChange: (interests: string[]) => void;
}

const interestsArray = [
    'frats', 'networking', 'career', 'study session', 'sports', 
    'anime', 'conference', 'ai/ml', 'research', 'cooking', 
    'hackathons', 'business'
];

import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'

const InterestsInput = ({ selectedInterests, onChange }:InterestsInputProps) => {

    const handleToggle = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            onChange(selectedInterests.filter(i => i !== interest));
        } else {
            onChange([...selectedInterests, interest]);
        }
    }

  return (
    <View 
    className="
        flex
        flex-wrap
        gap-4
        max-h-[20vh]
        overflow-y-hidden
    ">
        {interestsArray.map(interest => 
        {
            const selected = selectedInterests.includes(interest);
            return (
            <TouchableOpacity
                key={interest}
                className={`
                    px-4 
                    py-2 
                    border 
                    border-black 
                    rounded-full 
                    m-2 
                    flex
                    ${selected && 'bg-blue'}
                `}
                onPress={() => handleToggle(interest)}
            >
                <Text
                    className={`
                        text-black
                        flex
                        flex-row
                        space-x-2
                        ${selected && 'text-white'}
                    `}
                >
                    {interest} {selected ? '–' : '+'}
                </Text>
            </TouchableOpacity>
        )})}
    </View>
  )
}

export default InterestsInput