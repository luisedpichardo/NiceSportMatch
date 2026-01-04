import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import firestore, { Filter } from '@react-native-firebase/firestore';
// Stores
import { userStore } from '../stores/userStore';
import { useFocusEffect } from '@react-navigation/native';

export const useLastChatMessage = (someone: string) => {
  const [lastMessage, setLastMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const username = userStore(state => state.username);

  useFocusEffect(
    useCallback(() => {
      if (!username || !someone) {
        setLastMessage([]);
        setLoading(false);
        return;
      }

      const unsubscribe = firestore()
        .collection('messages')
        .where(
          Filter.or(
            Filter.and(
              Filter('sender', '==', username),
              Filter('receiver', '==', someone),
            ),
            Filter.and(
              Filter('sender', '==', someone),
              Filter('receiver', '==', username),
            ),
          ),
        )
        .orderBy('time', 'desc')
        .limit(1)
        .onSnapshot(
          snapshot => {
            if (!snapshot) return;

            const data = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setLastMessage(data[0]);
            setLoading(false);
          },
          e => {
            console.log(e);
            Alert.alert(e.message);
            setLoading(false);
          },
        );

      return () => unsubscribe();
    }, [username, someone]),
  );

  return { lastMessage, loading };
};
