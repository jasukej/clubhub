import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "@/config/firebase";

interface HeartButtonProps {
  currentUser?: any;
  eventId: string;
}

const HeartButton = ({ eventId, currentUser }: HeartButtonProps) => {
  const [hasFavourited, setHasFavourited] = useState(false);
  console.log(hasFavourited);

  useEffect(() => {
    if (currentUser && currentUser.favoritedIds) {
      setHasFavourited(currentUser.favoritedIds.includes(eventId));
    }
  }, [eventId, currentUser]);

  const toggleFavourite = useCallback(async () => {
    console.log("toggled");
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        console.log(userDocRef);

        if (hasFavourited) {
          // remove from favorites
          await updateDoc(userDocRef, {
            favoritedIds: arrayRemove(eventId),
          });
          setHasFavourited(false);
        } else {
          // add to favorites
          await updateDoc(userDocRef, {
            favoritedIds: arrayUnion(eventId),
          });
          setHasFavourited(true);
        }
      } catch (error) {
        console.error("Error toggling favorite status:", error);
      }
    }
  }, [eventId, currentUser, hasFavourited]);

  console.log(currentUser);

  return (
    <Pressable
      onPress={toggleFavourite}
      className="
        text-blue
        active:opacity-80
    "
    >
      {hasFavourited ? (
        <AntDesign name="heart" color={"#273AA0"} size={22} />
      ) : (
        <AntDesign name="hearto" size={22} color="#3954E4" />
      )}
    </Pressable>
  );
};

export default HeartButton;
