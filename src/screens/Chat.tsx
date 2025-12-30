import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { ChatInput } from '../components/ChatInput';
import { NoMessagesInChat } from '../components/NoMessagesInChat';
import { UserChat } from '../components/UserChat';
// Navigation Types
import { ChatNavStack, NavHomeTab } from '../navigation/types';
// Services
import { getMessagesForUserChat } from '../services/MessagesService';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Chat'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Chat = ({ navigation, route }: Props) => {
  const someone: string = route.params?.someone;
  const username = useUserStore(state => state.username);
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: someone,
    });
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    if (!username) return;
    getMessagesForUserChat(username, someone)
      .then(res => {
        setMessages(res);
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageCont}>
        {messages ? (
          <UserChat messages={messages} />
        ) : (
          <NoMessagesInChat someone={someone} />
        )}
      </View>
      <ChatInput receiver={someone} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  messageCont: {
    flex: 1,
    marginTop: '30%',
  },
});
