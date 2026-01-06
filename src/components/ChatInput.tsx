import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';
import { useInternet } from '../hooks/useInternet';
// Services
import { sendMessageService } from '../services/MessagesService';
// Stores
import { userStore } from '../stores/userStore';

type Props = {
  receiver: string;
};

export const ChatInput = ({ receiver }: Props) => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const { internetAccess } = useInternet();

  const onSendMessage = () => {
    if (!username || !message || !internetAccess) {
      if (!internetAccess) Alert.alert('There is no internet');
      setMessage('');
      return;
    }
    sendMessageService(username, receiver, message)
      .then(() => {
        setMessage('');
      })
      .catch(err => {
        Alert.alert(t('home-tabs.messages-stack.chat.fail-send'), err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.input,
          backgroundColor: theme.surface,
          color: theme.textPrimary,
        }}
        placeholder={t('home-tabs.messages-stack.chat.input-placeholder')}
        placeholderTextColor={theme.textSecondary}
        value={message}
        onChangeText={setMessage}
      />
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: theme.primary }}
        onPress={() => onSendMessage()}
      >
        <Text style={{ ...styles.btnTxt, color: theme.border }}>
          {t('home-tabs.messages-stack.chat.send')}
        </Text>
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
  },
  btn: {
    flex: 4,
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnTxt: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
