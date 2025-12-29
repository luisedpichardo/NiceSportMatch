import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatNavStack, NavHomeTab } from '../navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { ChatInput } from '../components/ChatInput';
import { NoMessagesInChat } from '../components/NoMessagesInChat';
import { UserChat } from '../components/UserChat';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Chat'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Chat = ({ navigation, route }: Props) => {
  const someone: string = route.params?.someone;
  const username = useUserStore(state => state.username);

  const messages: any = [
    {
      sender: someone,
      receiver: username,
      text: 'helloooo',
      time: '12313212',
    },
    {
      sender: username,
      receiver: someone,
      text: 'how u doin',
      time: '123333',
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: someone,
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.messageCont}>
        {messages.length ? (
          <UserChat messages={messages} />
        ) : (
          <NoMessagesInChat someone={someone} />
        )}
      </View>
      <ChatInput />
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
  },
});
