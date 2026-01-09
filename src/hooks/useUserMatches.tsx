import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useGetMatchesIds } from './useGetMatchesIds';
// Stores
import { userStore } from '../stores/userStore';
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

export const useUserMatches = (flag: string) => {
  const username = userStore(state => state.username);
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
          let data;
          if (flag === 'mine') {
            data =
              snapshot?.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter((item: any) => item.publisher === username)
                .filter((item: any) => dateFormatHelper(item.day) !== 'Past') ??
              [];
          } else if (flag === 'other') {
            data =
              snapshot?.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter((item: any) => item.publisher !== username)
                .filter((item: any) => dateFormatHelper(item.day) !== 'Past') ??
              [];
          } else {
            data =
              snapshot?.docs
                .map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                }))
                .filter((item: any) => dateFormatHelper(item.day) === 'Past') ??
              [];
          }
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
