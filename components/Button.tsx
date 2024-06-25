// components/Button.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Icon } from "@expo/vector-icons/build/createIconSet";

interface ButtonProps {
    label: string; 
    onPress: () => void;
    variant: 'dark' | 'outline' | 'primary' | 'secondary';
    icon?: any;
    className?: string;
    textClassName?: string;
}

const Button = ({ 
    label, 
    onPress, 
    variant, 
    icon,
    className,
    textClassName
}:ButtonProps) => {
    console.log(className)
  return (
    <TouchableOpacity 
    onPress={onPress} 
    className={`p-2 w-full rounded-lg mt-4 ${variantStyles[variant]} ${className}`}>
      <View 
      className="
        flex-row 
        items-center 
        flex
        justify-center
        gap-x-4"
        >
        {icon && {icon}}
        <Text className={`text-md ${variantTextStyles[variant]} ${textClassName}`}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const variantStyles = {
  dark: 'bg-gray-800',
  outline: 'border border-black bg-transparent',
  primary: 'bg-blue-500',
  secondary: 'bg-gray-400',
};

const variantTextStyles = {
  dark: 'text-white',
  outline: 'text-black',
  primary: 'text-white',
  secondary: 'text-black',
};

export default Button;
