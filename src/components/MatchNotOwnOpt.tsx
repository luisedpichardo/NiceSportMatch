import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Services
import { removeMatchFromUserService } from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = {
  publisher: string;
  _id: string;
};

type ChatStackParamList = {
  ChatNav: {
    screen: 'Messages';
    params: { someone: string };
  };
};

export const MatchNotOwnOpt = ({ publisher, _id }: Props) => {
  const username = useUserStore(state => state.username);
  const chatNav =
    useNavigation<NativeStackNavigationProp<ChatStackParamList>>();
  const removeMatchFromUser = async () => {
    if (!username) return;
    try {
      await removeMatchFromUserService(_id, username);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => removeMatchFromUser()}
        style={{ ...styles.btn, backgroundColor: 'red' }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Not interested anymore
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          chatNav.navigate('ChatNav', {
            screen: 'Messages',
            params: { someone: publisher },
          })
        }
        style={{ ...styles.btn, ...styles.openChatBtn }}
      >
        <Text style={{ fontWeight: 'bold' }}>Open Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  openChatBtn: {
    backgroundColor: 'lightgreen',
    borderWidth: 1,
    borderColor: 'green',
  },
});
