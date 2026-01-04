import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useGetMatchesIds } from './useGetMatchesIds';
// Stores
import { userStore } from '../stores/userStore';

export const useMyMatches = () => {
  const username = userStore(state => state.username);
  const [myMatches, setMyMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { matchesIds } = useGetMatchesIds();

  useEffect(() => {
    if (!username || matchesIds.length < 1) {
      setMyMatches([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribeIds = firestore()
      .collection('matches')
      .where(firestore.FieldPath.documentId(), 'in', matchesIds)
      .onSnapshot(
        snapshot => {
          const data =
            snapshot?.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter((item: any) => item.publisher === username) ?? [];
          // Assing corresponding data to matches
          setMyMatches(data);
          setLoading(false);
        },
        error => {
          Alert.alert('IDs listener error:', error.message);
          setLoading(false);
        },
      );

    return () => {
      if (unsubscribeIds) unsubscribeIds();
    };
  }, [username, matchesIds]);

  return { myMatches, loading };
};
