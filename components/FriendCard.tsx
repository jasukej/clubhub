import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface FriendCardProps {
  friend: User;
}

// fetch user based on this userId from 'users' collection
// and display as per design

const FriendCard = ({ friend }: FriendCardProps) => {
  const imageSource =
    friend.image && friend.image != ""
      ? { uri: friend.image }
      : require("../assets/images/placeholder.png");

  return (
    <View className="mb-4 flex-row items-center">
      <Image
        source={imageSource}
        style={{ width: 100, height: 100, borderRadius: 8 }} // Adjust size and styling as needed
      />
      <View className="flex flex-col">
        <Text className="text-lg font-bold text-blue">{friend.fullName}</Text>
        <Text className="text-sm text-blue-dark">{friend.username}</Text>
      </View>
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({});
