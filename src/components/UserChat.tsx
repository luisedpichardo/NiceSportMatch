import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Stores
import { userStore } from '../stores/userStore';

type Props = {
  messages: any;
};

export const UserChat = ({ messages }: Props) => {
  const username = userStore(state => state.username);
  const { theme } = useTheme();

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => {
        return (
          <View key={item.time} style={{ margin: 10 }}>
            {item.sender === username ? (
              <>
                {item.image ? (
                  <>
                    {console.log(item.image)}
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.yourImg}
                    />
                  </>
                ) : (
                  <View
                    style={{
                      ...styles.yourMessage,
                      backgroundColor: theme.ownBubble,
                    }}
                  >
                    <Text style={{ color: theme.ownChatText }}>
                      {item.message}
                    </Text>
                  </View>
                )}
              </>
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
                    <Text style={{ color: theme.chatText }}>
                      {item.message}
                    </Text>
                  </View>
                )}
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
    borderBottomRightRadius: 1,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginVertical: 4,
  },
  yourImg: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  img: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
});
