import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeartButton from "./HeartButton";
import formatEventTime from "@/utils/formatCardEventTime";
import { db } from "@/config/firebase";
import { arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { AntDesign } from "@expo/vector-icons";

interface EventCardProps {
  event: any;
  currentUser?: any;
  refresh: () => void;
  onPress: (event: EventObj) => void;
}

const EventCard = ({ event, currentUser, refresh, onPress }: EventCardProps) => {
  const {
    name,
    applicationNeeded,
    attendees,
    cost,
    description,
    createdAt,
    ended,
    field,
    organizationId,
    instagramLink,
    media,
    rsvpLink,
    startTime,
    endTime,
    type,
    venue,
  } = event;

  const imageSource =
    media.length > 0 && media[0] != ""
      ? { uri: media[0] }
      : require("../../assets/images/placeholder.png");

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const orgRef = doc(db, "organizations", organizationId);
        console.log(orgRef);
        const orgSnap = await getDoc(orgRef);
        console.log(orgSnap.data());

        setOrg(orgSnap.data());
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  const [org, setOrg] = useState<any>(null);

  const [hasFavourited, setHasFavourited] = useState(false);
  console.log(hasFavourited);

  useEffect(() => {
    if (currentUser) {
      setHasFavourited(currentUser.favoritedIds.includes(event.id));
    }
  }, [event, currentUser]);

  const toggleFavourite = useCallback(async () => {
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);

        if (hasFavourited) {
          // Remove from favorites
          await updateDoc(userDocRef, {
            favoritedIds: arrayRemove(event.id),
          });
        } else {
          // Add to favorites
          await updateDoc(userDocRef, {
            favoritedIds: arrayUnion(event.id),
          });
        }

        setHasFavourited((prev) => !prev);
        refresh();
        console.log("user info changed", currentUser);
      } catch (error) {
        console.error("Error toggling favorite status:", error);
      }
    }
  }, [event.id, currentUser, hasFavourited]);

  return (
    <View
      className="
    border-blue
    border-[1.2px]
    rounded-md
    w-full
    relative
    p-4
    bg-white
    shadow-sm
    "
    >
      <View
        className="
        absolute
        top-4
        right-4
      "
      >
        <Pressable
            onPress={(e) => {
              e.stopPropagation();
              console.log('pressed');
              toggleFavourite();
            }}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }} // increase press radius
            className="
              text-blue
              active:opacity-80
            "
          >
            {hasFavourited ? (
            <AntDesign name="heart" color={"#273AA0"} size={22} />
          ) : (
            <AntDesign name="hearto" size={22} color={"#3954E4"} />
          )}
        </Pressable>
      </View>
      <View
        className="
        flex
        flex-row
        gap-x-4
      "
      >
        <View>
          <Image
            source={imageSource}
            style={{ width: 100, height: 100, borderRadius: 8 }} // Adjust size and styling as needed
          />
        </View>
        <View
          className="
          flex
          flex-col
          gap-y-1
          text-blue
        "
        >
          <Text className="text-blue">
            {formatEventTime(event.startTime, event.endTime)}
            {/* !!! custom hook to format time */}
          </Text>
          <Pressable onPress={() => onPress(event)}>
            <Text
              className="
            text-xl
            font-bold
          "
            >
              {name}
            </Text>
          </Pressable>
          <Text
            className="
            text-md
            font-semibold
          "
          >
            by {org ? org.name : "Loading..."}
          </Text>
          <Text>
            <Text
              className="
            text-sm 
            text-gray-500"
            >
              {attendees.length} attendees
            </Text>
            {/* !!! logic for querying friends only from attendees */}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
