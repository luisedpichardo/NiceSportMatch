import { StyleSheet, View } from 'react-native';
// Components
import { MatchCardOptions } from './MatchCardOptions';
import { RigthSMatchPrev } from './RightSMatchPrev';
import { LeftSMatchPrev } from './LeftSMatchPrev';
// Stores
import { useStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Match = {
  match: any;
};

export const MatchPrev = ({ match }: Match) => {
  const username = useStore(state => state.username);
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View
      style={{
        ...styles.container,
        shadowColor: theme.cardShadow,
        backgroundColor: theme.surface,
      }}
    >
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
    padding: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
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
    justifyContent: 'space-around',
    marginBottom: 5,
  },
});
