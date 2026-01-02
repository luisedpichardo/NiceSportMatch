import { FlatList, StyleSheet, View } from 'react-native';
// Components
import { Loading } from '../components/Loading';
import { NoMatches } from '../components/NoMatches';
import { MatchPrev } from '../components/MatchPrev';
// Hooks
import { useOthersMatches } from '../hooks/useOthersMatches';

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

export const OtherMatches = () => {
  const { othersMatches, loadingOthers } = useOthersMatches();
  return (
    <View style={styles.container}>
      <View style={styles.matchesContatiner}>
        {loadingOthers ? (
          <Loading />
        ) : (
          <>
            {othersMatches.length > 0 ? (
              showMathes(othersMatches)
            ) : (
              <NoMatches own={false} />
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
    flex: 1,
    borderRadius: 25,
    marginVertical: 10,
  },
});
