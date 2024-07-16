import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import useFavourite from '@/hooks/useFavourite';

interface HeartButtonProps {
    currentUser?: any,
    eventId: string,
}

const HeartButton = ({eventId, currentUser}:HeartButtonProps) => {

    const { hasFavourited, toggleFavourite } = useFavourite({
      eventId,
      currentUser
    });

  return (
    <TouchableOpacity 
    onPress={toggleFavourite}
    className="
        text-blue
    "
    >
      {hasFavourited ?
        <AntDesign 
          name="hearto" 
          color={'#273AA0'}
          size={22} />
          : 
        <AntDesign 
          name="heart" 
          size={22} 
          color="#3954E4" />
      }
    </TouchableOpacity>
  )
}

export default HeartButton