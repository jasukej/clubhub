import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

interface HeartButtonProps {
    currentUser?: any,
    eventId: string,
}

const HeartButton = () => {

    const [isFavorited, setIsFavorited] = useState(false);

  return (
    <TouchableOpacity 
    className="
        text-blue
    "
    onPress={() => {}}
    >
        <AntDesign name="hearto" size={24} />
    </TouchableOpacity>
  )
}

export default HeartButton