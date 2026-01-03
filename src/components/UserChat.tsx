import { FlatList, StyleSheet, Text, View } from 'react-native';
// Stores
import { useStore } from '../stores/userStore';
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = {
  messages: any;
};

export const UserChat = ({ messages }: Props) => {
  const username = useStore(state => state.username);
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => {
        return (
          <View key={item.time} style={{ margin: 10 }}>
            {item.sender === username ? (
              <View
                style={{
                  ...styles.yourMessage,
                  backgroundColor: theme.ownBubble,
                }}
              >
                <Text style={{ color: theme.ownChatText }}>{item.message}</Text>
              </View>
            ) : (
              <View>
                <Text>{item.sender}</Text>
                <View
                  style={{
                    ...styles.messageCont,
                    backgroundColor: theme.bubble,
                  }}
                >
                  <Text style={{ color: theme.chatText }}>{item.message}</Text>
                </View>
              </View>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  messageCont: {
    padding: 12,
    borderRadius: 15,
    borderBottomLeftRadius: 2,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  yourMessage: {
    padding: 12,
    borderRadius: 15,
    borderBottomRightRadius: 2,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginVertical: 4,
  },
});
