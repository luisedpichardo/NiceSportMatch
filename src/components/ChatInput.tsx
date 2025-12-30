import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// Services
import { sendMessageService } from '../services/MessagesService';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = {
  receiver: string;
};

export const ChatInput = ({ receiver }: Props) => {
  const username = useUserStore(state => state.username);
  const [message, setMessage] = useState('');

  const onSendMessage = () => {
    if (!username) return;
    sendMessageService(username, receiver, message)
      .then(() => {
        setMessage('');
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type text"
        value={message}
        onChangeText={setMessage}
      />
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity style={styles.btn} onPress={() => onSendMessage()}>
        <Text style={styles.btnTxt}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '5%',
    marginHorizontal: '10%',
  },
  input: {
    flex: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btn: {
    flex: 4,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  btnTxt: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
