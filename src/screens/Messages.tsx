import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { ChatPrev } from '../components/ChatPrev';
// Types
import { ChatNavStack, NavHomeTab } from '../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Messages'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Messages = ({ navigation }: Props) => {
  const chats = [
    {
      id: 12,
      sender: 'username',
      lastMessage: 'you down?',
      timeOfLast: '14:00',
    },
    {
      id: 34,
      sender: 'username2',
      lastMessage: 'you down?',
      timeOfLast: '14:00',
    },
    {
      id: 54,
      sender: 'username3',
      lastMessage: 'you down?',
      timeOfLast: '14:00',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.messagesCont}>
        {chats.length === 0 ? (
          <View>
            <Text>No chats yet</Text>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item }) => {
              return <ChatPrev key={item.id} sender={item.sender} />;
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  messagesCont: {
    flex: 1,
    marginVertical: '40%',
    borderRadius: 25,
    margin: 20,
  },
});
