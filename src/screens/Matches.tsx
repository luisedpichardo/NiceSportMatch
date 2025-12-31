import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { MatchPrev } from '../components/MatchPrev';
import { Loading } from '../components/Loading';
import { NoMatches } from '../components/NoMatches';
// Hooks
import { useUserMatches } from '../hooks/useUserMatches';
// Stores
import { useUserStore } from '../stores/userStore';
// Nav Types
import { MatchNavStack, NavHomeTab } from '../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MatchNavStack, 'Matches'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Matches = ({ navigation }: Props) => {
  const username = useUserStore(state => state.username);

  const { matches, loading } = useUserMatches();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateMatch')}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Create Match</Text>
      </TouchableOpacity>
      <View style={styles.matchesContatiner}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {username && matches.length > 0 ? (
              <FlatList
                data={matches}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                  return <MatchPrev match={item} />;
                }}
              />
            ) : (
              <NoMatches />
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
    backgroundColor: 'lightgreen',
  },
  btn: {
    marginHorizontal: 20,
    padding: 10,
    paddingHorizontal: 30,
    marginTop: '30%',
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  matchesContatiner: {
    flex: 1,
    marginBottom: '25%',
    borderRadius: 25,
    marginVertical: 30,
  },
});
