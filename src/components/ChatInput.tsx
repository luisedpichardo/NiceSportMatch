import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
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
import { SelectImgModal } from './SelectImgModal';

type Props = {
  receiver: string;
};

export const ChatInput = ({ receiver }: Props) => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const { internetAccess } = useInternet();
  const [modalAttachement, setModalAttachement] = useState(false);

  const onSendMessage = () => {
    if (!username || !message || !internetAccess) {
      if (!internetAccess) Alert.alert(t('no-internet'));
      setMessage('');
      return;
    }
    sendMessageService(username, receiver, message, 'text', '')
      .then(() => {
        setMessage('');
      })
      .catch(err => {
        Alert.alert(t('home-tabs.messages-stack.chat.fail-send'), err);
      });
  };

  const onSendImage = () => {
    setModalAttachement(true);
  };

  return (
    <View testID="container" style={styles.container}>
      {modalAttachement && (
        <SelectImgModal
          modalVisible={modalAttachement}
          setModalVisible={setModalAttachement}
          receiver={receiver}
        />
      )}
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
      <Pressable
        style={{ ...styles.btn, backgroundColor: theme.primary }}
        onPress={() => onSendImage()}
      >
        <Image
          source={require('../../assets/attach-document.png')}
          style={{ ...styles.iconSty, tintColor: theme.border }}
        />
      </Pressable>
      <View style={{ flex: 0.5 }}></View>
      <TouchableOpacity
        testID="sendMessageBtn"
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
  iconSty: {
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
});
