interface InterestsInputProps {
    selectedInterests: string[],
    onChange: (interests: string[]) => void;
}

const interestsArray = [
    'frats', 'networking', 'career', 'study session', 'sports', 
    'anime', 'conference', 'ai/ml', 'research', 'cooking', 
    'hackathons', 'business'
];

import { View, Text, TouchableOpacity } from 'react-native'
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
        flex-row
        flew-wrap
        gap-8
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
                    border-1 
                    border 
                    border-black
                    rounded-full
                    m-4
                    ${selected && 'bg-blue'}
                `}
            >
                <Text
                    className={`
                        text-black
                        ${selected && 'text-white'}
                    `}
                >
                    {interest}
                </Text>
            </TouchableOpacity>
        )})}
      <Text>InterestsInput</Text>
    </View>
  )
}

export default InterestsInput