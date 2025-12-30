import { FlatList, StyleSheet, Text, View } from 'react-native';
// Stores
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
              <View style={{ ...styles.messageCont, ...styles.yourMessage }}>
                <Text style={styles.yourTxt}>{item.message}</Text>
              </View>
            ) : (
              <View>
                <Text>{item.sender}</Text>
                <View style={styles.messageCont}>
                  <Text style={styles.notYourTxt}>{item.message}</Text>
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
    padding: 10,
    width: '50%',
    backgroundColor: 'gray',
  },
  notYourTxt: {
    color: 'white',
  },
  yourMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  yourTxt: {
    alignSelf: 'flex-end',
  },
});
