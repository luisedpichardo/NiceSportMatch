import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// Components
import { NoMatches } from '../components/NoMatches';
import { Loading } from '../components/Loading';
import { MatchPrev } from '../components/MatchPrev';
// Hooks
import { useMyMatches } from '../hooks/useMyMatches';
// Navigation
import { MatchNavStack, NavHomeTab } from '../navigation/types';
// Services
import { analyticsService, types } from '../services/AnalyticsService';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MatchNavStack, 'Matches'>,
  BottomTabScreenProps<NavHomeTab>
>;

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

export const MyMatches = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { myMatches, loading } = useMyMatches();
  return (
    <View style={styles.container}>
      <View style={styles.matchesContatiner}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {myMatches.length > 0 ? (
              showMathes(myMatches)
            ) : (
              <NoMatches own={true} />
            )}
          </>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              analyticsService(types.BUTTON, 'User Attemps to create a match');
              navigation.navigate('CreateMatch');
            }}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>
              {t('home-tabs.match-stack.matches.btn-txt')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  btnContainer: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  btn: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: 'green',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  matchesContatiner: {
    flex: 4,
    marginVertical: 10,
  },
});
