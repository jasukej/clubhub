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

interface RegisterButtonProps {
  currentUser?: any;
  eventId: string;
}

const RegisterButton = ({ eventId, currentUser }: RegisterButtonProps) => {
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setHasRegistered(currentUser.registeredIds.includes(eventId));
    }
  }, [eventId, currentUser]);

  const toggleRegistration = useCallback(async () => {
    console.log("toggled");
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);

        if (hasRegistered) {
          setHasRegistered(false);
          // remove from registered
          await updateDoc(userDocRef, {
            registeredIds: arrayRemove(eventId),
          });
          console.log("---------------------REMOVED");
          console.log(currentUser);
        } else {
          setHasRegistered(true);
          // add to registered
          await updateDoc(userDocRef, {
            registeredIds: arrayUnion(eventId),
          });
          console.log("---------------------ADDED");
          console.log(currentUser);
        }
      } catch (error) {
        console.error("Error toggling registered status:", error);
      }
    }
  }, [eventId, currentUser, hasRegistered]);

  return (
    <Pressable
      onPress={toggleRegistration}
      className="
        text-blue
        active:opacity-80
    "
    >
      {hasRegistered ? (
        <AntDesign name="checkcircle" color={"#273AA0"} size={22} />
      ) : (
        <AntDesign name="pluscircleo" size={22} color="#3954E4" />
      )}
    </Pressable>
  );
};

export default RegisterButton;
