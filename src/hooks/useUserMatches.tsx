import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useUserStore } from '../stores/userStore';
import { getMatchesIdsService } from '../services/UserService';
import { Alert } from 'react-native';

export const useUserMatches = () => {
  const username = useUserStore(state => state.username);
  const [matches, setMatches] = useState<any[]>([]);
  const [matchesIds, setMatchesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    getMatchesIdsService(username)
      .then(res => {
        setMatchesIds(res ?? []);
      })
      .catch(err => Alert.alert(err.message));
  }, [username]);

  useEffect(() => {
    if (!username) {
      setMatches([]);
      setLoading(false);
      return;
    }
    let unsubscribeIds = null;
    setLoading(true);

    // Look for personal matches
    const unsubscribePublisher = firestore()
      .collection('matches')
      .where('publisher', '==', username)
      .onSnapshot(
        snapshot => {
          const data =
            snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) ?? [];
          setMatches(prev => mergeAndSortMatches(prev, data));
          setLoading(false);
        },
        error => {
          console.error('Publisher listener error:', error);
          setLoading(false);
        },
      );
    // Look for mathces user is interested in
    if (matchesIds.length > 0) {
      unsubscribeIds = firestore()
        .collection('matches')
        .where(firestore.FieldPath.documentId(), 'in', matchesIds)
        .onSnapshot(
          snapshot => {
            const data =
              snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) ?? [];
            // Send old and new elements into a new single array
            setMatches(prev => mergeAndSortMatches(prev, data));
            setLoading(false);
          },
          error => {
            console.error('IDs listener error:', error);
            setLoading(false);
          },
        );
    }

    return () => {
      unsubscribePublisher();
      if (unsubscribeIds) unsubscribeIds();
    };
  }, [username, matchesIds]);

  // Merge arrays and sort by 'day'
  const mergeAndSortMatches = (arr1: any[], arr2: any[]) => {
    const map = new Map<string, any>();
    arr1.forEach(m => map.set(m.id, m));
    arr2.forEach(m => map.set(m.id, m));

    const merged = Array.from(map.values());
    // Sort by day
    merged.sort((a, b) => {
      if (!a.day) return 1;
      if (!b.day) return -1;
      if (typeof a.day === 'number' && typeof b.day === 'number') {
        return a.day - b.day;
      }
      return new Date(a.day).getTime() - new Date(b.day).getTime();
    });

    return merged;
  };

  return { matches, loading };
};
