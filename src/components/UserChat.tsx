import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '../stores/userStore';

type Props = {
  messages: any;
};

export const UserChat = ({ messages }: Props) => {
  const username = useUserStore(state => state.username);

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => {
        return (
          <View key={item.time} style={{ margin: 10 }}>
            {item.sender === username ? (
              <View style={styles.yourMessage}>
                <Text style={styles.yourTxt}>{item.text}</Text>
              </View>
            ) : (
              <View>
                <Text>{item.sender}</Text>
                <View style={styles.messageCont}>
                  <Text>{item.text}</Text>
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
    borderRadius: 10,
    padding: 15,
    width: '50%',
    backgroundColor: 'gray',
  },
  yourMessage: {
    borderRadius: 10,
    padding: 15,
    width: '50%',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  yourTxt: {
    alignSelf: 'flex-end',
  },
});
