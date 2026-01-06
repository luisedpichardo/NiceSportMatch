import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useGetMatchesIds } from './useGetMatchesIds';
// Stores
import { userStore } from '../stores/userStore';
// Utils
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

export const useOthersMatches = () => {
  const username = userStore(state => state.username);
  const [othersMatches, setOthersMatches] = useState<any[]>([]);
  const [loadingOthers, setLoadingOthers] = useState(true);

  const { matchesIds } = useGetMatchesIds();

  useEffect(() => {
    if (!username || matchesIds.length < 1) {
      setOthersMatches([]);
      setLoadingOthers(false);
      return;
    }
    setLoadingOthers(true);
    const unsubscribeIds = firestore()
      .collection('matches')
      .where(firestore.FieldPath.documentId(), 'in', matchesIds)
      .onSnapshot(
        snapshot => {
          const data =
            snapshot?.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter((item: any) => item.publisher !== username)
              .filter((item: any) => dateFormatHelper(item.day) !== 'Past') ??
            [];
          // Assing corresponding data to matches
          setOthersMatches(data);
          setLoadingOthers(false);
        },
        error => {
          Alert.alert('IDs listener error:', error.message);
          setLoadingOthers(false);
        },
      );

    return () => {
      if (unsubscribeIds) unsubscribeIds();
    };
  }, [username, matchesIds]);

  return { othersMatches, loadingOthers };
};
