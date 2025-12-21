import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Match = {
  match: any;
};

export const MatchPrev = ({ match }: Match) => {
  return (
    <View style={styles.container}>
      <View style={styles.matchInfo}>
        <View>
          <Text>Publisher: {match.publisher}</Text>
          <Text>Place: {match.address}</Text>
          <Text>Status: {match.status}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>{match.day} 📅</Text>
          <Text>{match.time} 🕐</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          console.log('openning chat with publisher', match.publisher)
        }
        style={styles.btn}
      >
        <Text>Open Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 20,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgreen',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
