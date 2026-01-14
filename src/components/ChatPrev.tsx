import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
// Hooks
import { useLastChatMessage } from '../hooks/useLastChatMessage';
import { useProfileImage } from '../hooks/useProfileImage';
import { useTheme } from '../hooks/useTheme';

type Props = {
  sender: string;
  navigation: any;
};

export const ChatPrev = ({ sender, navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { lastMessage, loading } = useLastChatMessage(sender);
  const { imageUri } = useProfileImage(sender);

  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: theme.surface }}
      onPress={() => navigation.navigate('Chat', { someone: sender })}
    >
      <View style={styles.chat}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <FastImage source={{ uri: imageUri }} style={styles.imgStyle} />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{ color: theme.textPrimary }}>{sender}</Text>
              {sender === lastMessage.sender ? (
                <Text style={{ color: theme.textPrimary }}>
                  {lastMessage.message}
                </Text>
              ) : (
                <Text style={{ color: theme.textPrimary }}>
                  {t('home-tabs.messages-stack.messages.prev.you')}:{' '}
                  {lastMessage.message}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 20,
  },
  chat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  imgStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
