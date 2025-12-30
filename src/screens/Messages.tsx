import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { ChatPrev } from '../components/ChatPrev';
import { RedirectModal } from '../components/RedirectModal';
import { NoChats } from '../components/NoChats';
// Types
import { ChatNavStack, NavHomeTab } from '../navigation/types';
// Services
import { getChatsForUsersService } from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Messages'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Messages = ({ navigation, route }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const username = useUserStore(state => state.username);
  const someone = route.params?.someone;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (someone) {
      setVisibleModal(true);
    }
  }, [route.params]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = () => {
    if (!username) return;
    getChatsForUsersService(username)
      .then(res => {
        setChats(res);
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

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
          <NoChats />
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item, index }) => {
              return (
                <ChatPrev key={index} sender={item} navigation={navigation} />
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
