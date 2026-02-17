import { Image, StyleSheet, Text, View } from 'react-native';
// Components
import { BubbleChatOwn } from './BubbleChatOwn';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Stores
import { userStore } from '../stores/userStore';

export const BubbleChat = ({ item }) => {
  const username = userStore(state => state.username);
  const { theme } = useTheme();

  return (
    <View style={styles.cont}>
      {item.sender === username ? (
        <BubbleChatOwn item={item} />
      ) : (
        <View>
          <Text style={{ color: theme.textPrimary }}>{item.sender}</Text>

          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.img} />
          ) : (
            <View
              style={{
                ...styles.messageCont,
                backgroundColor: theme.bubble,
              }}
            >
              <Text style={{ color: theme.chatText }}>{item.message}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    margin: 10,
  },
  img: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  messageCont: {
    padding: 12,
    borderRadius: 15,
    borderBottomLeftRadius: 2,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
});
