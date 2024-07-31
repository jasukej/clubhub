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
    noFlex?:boolean;
}

const Button = ({ 
    label, 
    onPress, 
    variant, 
    icon,
    className,
    textClassName,
    noFlex
}:ButtonProps) => {
  return (
    <TouchableOpacity 
    onPress={onPress} 
    className={`${className} p-2 ${!noFlex ? "w-full mt-4" : "mt-2"} rounded-lg ${variantStyles[variant]}`}>
      <View 
      className="
        flex-row 
        items-center 
        flex
        justify-center
        gap-x-2"
        >
        {icon && icon}
        {label.trim() != "" &&
        <Text className={`text-md ${variantTextStyles[variant]} ${textClassName}`}>
          {label}
        </Text>}
      </View>
    </TouchableOpacity>
  );
};

const variantStyles = {
  dark: 'bg-gray-800',
  outline: 'border border-black bg-transparent',
  primary: 'bg-blue',
  secondary: 'bg-gray-400',
};

const variantTextStyles = {
  dark: 'text-white',
  outline: 'text-black',
  primary: 'text-white',
  secondary: 'text-black',
};

export default Button;
