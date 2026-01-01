import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Hooks
import { useLastChatMessage } from '../hooks/useLastChatMessage';
import { useProfileImage } from '../hooks/useProfileImage';

type Props = {
  sender: string;
  navigation: any;
};

export const ChatPrev = ({ sender, navigation }: Props) => {
  const { lastMessage, loading } = useLastChatMessage(sender);
  const { imageUri } = useProfileImage(sender);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Chat', { someone: sender })}
    >
      <View style={styles.chat}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require('../../assets/account_pp_default.jpg')
              }
              style={styles.imgStyle}
            />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text>{sender}</Text>
              {sender === lastMessage.sender ? (
                <Text>{lastMessage.message}</Text>
              ) : (
                <Text>You: {lastMessage.message}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
