import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Messages</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return <ChatPrev key={item.id} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  topCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: '30%',
    marginBottom: '5%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
    justifyContent: 'flex-end',
  },
});
