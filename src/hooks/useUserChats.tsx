import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
// Services
import { getChatsForUsersService } from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

export const useUserChats = () => {
  const username = useUserStore(state => state.username);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

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
