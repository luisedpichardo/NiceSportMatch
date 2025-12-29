import { StyleSheet, Text, View } from 'react-native';
// Components
import { MatchCardOptions } from './MatchCardOptions';
// Stores
import { useUserStore } from '../stores/userStore';

type Match = {
  match: any;
};

export const MatchPrev = ({ match }: Match) => {
  const username = useUserStore(state => state.username);

  return (
    <View style={styles.container}>
      <View style={styles.matchInfo}>
        <View>
          {username === match.publisher ? (
            <Text>Publisher: You</Text>
          ) : (
            <Text>Publisher: {match.publisher}</Text>
          )}
          <Text>Status: {match.status}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>{match.day} 📅</Text>
          <Text>{match.time} 🕐</Text>
        </View>
      </View>
      <MatchCardOptions
        publisher={match.publisher}
        own={username === match.publisher}
        match={match}
      />
    </View>
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
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
