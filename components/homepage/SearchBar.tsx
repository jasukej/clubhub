import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    searchQuery: string,
    setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <View className="
        mb-3
        flex 
        flex-row 
        items-center 
        px-4 
        py-2
        bg-white
        rounded-md
        border
        border-gray-400">
      <Ionicons name="search" size={24} color="gray" />
      <TextInput 
        placeholder="Search events..."
        onChangeText={text => setSearchQuery(text)}
        className="flex-1 ml-2"
      />
    </View>
  );
}

export default SearchBar;
