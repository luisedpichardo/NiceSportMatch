import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Services
import { removeMatchFromUserService } from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = {
  publisher: string;
  _id: string;
};

export const MatchNotOwnOpt = ({ publisher, _id }: Props) => {
  const username = useUserStore(state => state.username);
  const removeMatchFromUser = async () => {
    if (!username) {
      throw new Error('Could not get acces to username');
    }
    await removeMatchFromUserService(_id, username);
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
        onPress={() => console.log('openning chat with publisher', publisher)}
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
