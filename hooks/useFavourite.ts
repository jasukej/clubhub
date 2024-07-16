import { useState, useEffect, useCallback, useMemo } from 'react';
import { getDoc, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface useFavouriteProps {
    eventId: string;
    currentUser: any; 
}

const useFavourite = ({ eventId, currentUser }: useFavouriteProps) => {
    const [hasFavourited, setHasFavourited] = useState(false);

    useEffect(() => {
        const checkFavourite = async () => {
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setHasFavourited(userData.bookmarkedEvents.includes(eventId));
                }
            }
        };

        checkFavourite();
    }, [currentUser, eventId]);

    const toggleFavourite = useCallback(async () => {
        if (!currentUser) {
            // Handle not logged in case, maybe show a login prompt
            return;
        }

        try {
            const userRef = doc(db, 'users', currentUser.uid);
            if (hasFavourited) {
                await updateDoc(userRef, {
                    bookmarkedEvents: arrayRemove(eventId)
                });
            } else {
                await updateDoc(userRef, {
                    bookmarkedEvents: arrayUnion(eventId)
                });
            }
            setHasFavourited(!hasFavourited);
        } catch (error) {
            console.error('Error updating favourites: ', error);
        }
    }, [currentUser, eventId, hasFavourited]);

    return { hasFavourited, toggleFavourite };
};

export default useFavourite;
