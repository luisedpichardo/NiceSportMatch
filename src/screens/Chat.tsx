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
import { useStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Chat'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Chat = ({ navigation, route }: Props) => {
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const someone: string = route.params?.someone;
  const { messages, loading } = useChatMessages(someone);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: someone,
    });
  }, [navigation, someone]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.secondary }}>
      <View style={{ flex: 1, marginBottom: '5%' }}>
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
  },
  messageCont: {
    flex: 1,
    marginTop: '30%',
  },
});
