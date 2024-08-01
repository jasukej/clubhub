import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'

interface InputProps {
    label: string;
    placeholder?: string;
    control: any;
    name: string;
    secureTextEntry?: boolean;
    rules?: object;
    errors: any;
    side?: boolean;
}

const Input = ({
    label,
    placeholder,
    control,
    name,
    secureTextEntry,
    rules,
    errors,
    side,
}:InputProps) => {
  return (
    <View className={`
        w-full
        mt-4
        flex-start
        flex
        ${side ? "flex-row justify-between items-center" : "flex-col"}
    `}>
        <Text className="
            text-sm
            font-medium
            mb-1
        ">
            {label}
        </Text>
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {onBlur, onChange, value}}) => (
                <TextInput 
                    className={`border rounded-md p-2 ${side ? "w-[55vw]" : "w-full"}`}
                    placeholder={placeholder ? placeholder : ''}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChange}
                />
            )}
        />
        {errors[name] && <Text className="text-red">{errors[name]?.message}</Text>}
    </View>
  )
}

export default Input