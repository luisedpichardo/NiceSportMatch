import { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { ChatInput } from '../components/ChatInput';
import { NoMessagesInChat } from '../components/NoMessagesInChat';
import { UserChat } from '../components/UserChat';
// Hooks
import { useChatMessages } from '../hooks/useChatMessages';
// Navigation Types
import { ChatNavStack, NavHomeTab } from '../navigation/types';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Chat'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Chat = ({ navigation, route }: Props) => {
  const someone: string = route.params?.someone;
  const username = useUserStore(state => state.username);
  const { messages, loading } = useChatMessages(username?.toString(), someone);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: someone,
    });
  }, [navigation, someone]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginBottom: '20%' }}>
        <View style={styles.messageCont}>
          {!loading && messages.length > 0 ? (
            <UserChat messages={messages} />
          ) : (
            <NoMessagesInChat someone={someone} />
          )}
        </View>
        <KeyboardAvoidingView behavior="padding">
          <ChatInput receiver={someone} />
        </KeyboardAvoidingView>
      </View>
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
