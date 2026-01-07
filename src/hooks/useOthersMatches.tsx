import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useGetMatchesIds } from './useGetMatchesIds';
import { useInternet } from './useInternet';
// Services
import { readOtherMatchesFromDBService } from '../services/LocalDBService';
// Stores
import { userStore } from '../stores/userStore';
// Utils
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

export const useOthersMatches = () => {
  const username = userStore(state => state.username);
  const [othersMatches, setOthersMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { internetAccess } = useInternet();
  const { matchesIds } = useGetMatchesIds();

  useEffect(() => {
    if (!username || matchesIds.length < 1) {
      setOthersMatches([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (!internetAccess) {
      setLoading(true);
      fetchForNoInternet(username);
      return;
    }

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
  }, [username, matchesIds, internetAccess]);

  const fetchForNoInternet = async (username: string) => {
    const othersMatches: any = await readOtherMatchesFromDBService(username);
    // set othersMatches;
    setOthersMatches(othersMatches);
    setLoading(false);
  };

  return { othersMatches, loading };
};
