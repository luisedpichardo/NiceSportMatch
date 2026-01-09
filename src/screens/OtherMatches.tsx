import { FlatList, StyleSheet, View } from 'react-native';
// Components
import { Loading } from '../components/Loading';
import { NoMatches } from '../components/NoMatches';
import { MatchPrev } from '../components/MatchPrev';
// Hooks
import { useUserMatches } from '../hooks/useUserMatches';

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
  const { matches, loading } = useUserMatches('other');

  return (
    <View style={styles.container}>
      <View style={styles.matchesContatiner}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {matches.length > 0 ? (
              showMathes(matches)
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
    marginBottom: '33%',
  },
});
