import { FlatList, StyleSheet, View } from 'react-native';
// Components
import { NoMatches } from '../components/NoMatches';
import { Loading } from '../components/Loading';
import { MatchPrev } from '../components/MatchPrev';
// Hooks
import { usePastMatches } from '../hooks/usePastMatches';

function showMathes(matches: any) {
  return (
    <FlatList
      data={matches}
      keyExtractor={item => item._id}
      renderItem={({ item }) => {
        return <MatchPrev match={item} />;
      }}
    />
  );
}

export const PastMatches = () => {
  const { pastMatches, loading } = usePastMatches();

  return (
    <View style={styles.container}>
      <View style={styles.matchesContatiner}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {pastMatches.length > 0 ? (
              showMathes(pastMatches)
            ) : (
              <NoMatches own={true} />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  matchesContatiner: {
    flex: 4,
    marginVertical: 10,
    marginBottom: '33%',
  },
});
