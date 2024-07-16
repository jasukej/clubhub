import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface AvatarProps {
    src: string | null | undefined,
    size: number
}

const Avatar = ({
    src,
    size
}:AvatarProps) => {
  return (
    <View>
    {src &&
      <img 
        src={src} 
        height={size}
        width={size}
        style={{ objectFit: "cover" }}
      />
    }
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({})