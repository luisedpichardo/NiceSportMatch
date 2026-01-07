import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useGetMatchesIds } from './useGetMatchesIds';
import { useInternet } from './useInternet';
// Services
import { readAllUserMatchesFromDBService } from '../services/LocalDBService';
// Stores
import { userStore } from '../stores/userStore';
// Utils
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

export const useMyMatches = () => {
  const username = userStore(state => state.username);
  const [myMatches, setMyMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { internetAccess } = useInternet();
  const { matchesIds } = useGetMatchesIds();

  useEffect(() => {
    if (!username || matchesIds.length < 1) {
      setMyMatches([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    if (!internetAccess) {
      setLoading(true);
      fetchForNoInternet(username);
      setLoading(false);
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
              .filter((item: any) => item.publisher === username)
              .filter((item: any) => dateFormatHelper(item.day) !== 'Past') ??
            [];
          // Assigning corresponding data to matches
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
  }, [username, matchesIds, internetAccess]);

  const fetchForNoInternet = async (username: string) => {
    const myMatches: any = await readAllUserMatchesFromDBService(username);
    // set myMatches;
    const actual = myMatches.filter(
      (item: any) => dateFormatHelper(item.day) !== 'Past',
    );
    setMyMatches(actual);
  };

  return { myMatches, loading };
};
