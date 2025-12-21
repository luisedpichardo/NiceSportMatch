import { StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '../stores/userStore';
import { MatchCardOptions } from './MatchCardOptions';

type Match = {
  match: any;
};

export const MatchPrev = ({ match }: Match) => {
  const username = useUserStore.getState().username;

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
      {username === match.publisher ? (
        <></>
      ) : (
        <MatchCardOptions publisher={match.publisher} />
      )}
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
});
