import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { ChatPrev } from '../components/ChatPrev';
import { RedirectModal } from '../components/RedirectModal';
// Types
import { ChatNavStack, NavHomeTab } from '../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Messages'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Messages = ({ navigation, route }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const someone = route.params?.someone;

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

  useEffect(() => {
    if (someone) {
      setVisibleModal(true);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <RedirectModal
        modalVisible={visibleModal}
        setModalVisible={setVisibleModal}
        someone={someone}
        navigation={navigation}
      />

      <View style={styles.messagesCont}>
        {chats.length === 0 ? (
          <View>
            <Text>No chats yet</Text>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item }) => {
              return (
                <ChatPrev
                  key={item.id}
                  sender={item.sender}
                  navigation={navigation}
                />
              );
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
