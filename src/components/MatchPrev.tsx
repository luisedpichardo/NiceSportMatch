import { StyleSheet, View } from 'react-native';
// Components
import { MatchCardOptions } from './MatchCardOptions';
import { RigthSMatchPrev } from './RightSMatchPrev';
import { LeftSMatchPrev } from './LeftSMatchPrev';
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
        <LeftSMatchPrev publisher={match.publisher} status={match.status} />
        <RigthSMatchPrev day={match.day} time={match.time} />
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
