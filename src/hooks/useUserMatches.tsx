import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useGetMatchesIds } from './useGetMatchesIds';
// Stores
import { useStore } from '../stores/userStore';

export const useUserMatches = () => {
  const username = useStore(state => state.username);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { matchesIds } = useGetMatchesIds();

  useEffect(() => {
    if (!username || matchesIds.length < 1) {
      setMatches([]);
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
            snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) ?? [];
          // Assing corresponding data to matches
          setMatches(data);
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

  return { matches, loading };
};
