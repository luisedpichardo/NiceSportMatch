import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// Services
import { getChatsForUsersService } from '../services/UserService';
// Stores
import { userStore } from '../stores/userStore';

export const useUserChats = () => {
  const username = userStore(state => state.username);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, []),
  );

  const fetchChats = () => {
    if (!username) return;
    getChatsForUsersService(username)
      .then(res => {
        setChats(res ?? []);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Error', err);
      });
  };

  return { chats, loading };
};
