import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getMatchesIdsService } from '../services/UserService';
import { userStore } from '../stores/userStore';
import { useTranslation } from 'react-i18next';

export const useMatchesIds = () => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const [matchesIDs, setMatchesIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchesIds();
  }, []);

  const fetchMatchesIds = async () => {
    if (!username) {
      Alert.alert(
        t('home-tabs.map.modal.fail'),
        t('home-tabs.map.modal.fail-mess'),
      );
      return;
    }
    await getMatchesIdsService(username)
      .then(res => {
        setMatchesIDs(res ?? []);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };

  return { matchesIDs, loading };
};
