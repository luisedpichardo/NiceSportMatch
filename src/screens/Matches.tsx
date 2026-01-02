import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { MatchPrev } from '../components/MatchPrev';
import { Loading } from '../components/Loading';
import { NoMatches } from '../components/NoMatches';
// Hooks
import { useMyMatches } from '../hooks/useMyMatches';
import { useOthersMatches } from '../hooks/useOthersMatches';
// Nav Types
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

export const Matches = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [isMyMatches, setIsMyMatches] = useState(true);
  const { myMatches, loading } = useMyMatches();
  const { othersMatches, loadingOthers } = useOthersMatches();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('home-tabs.match-stack.matches.header-title'),
    });
  });

  return (
    <View style={styles.container}>
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
      <View style={styles.matchesContatiner}>
        <View style={styles.btnViewCont}>
          <Pressable
            onPress={() => setIsMyMatches(true)}
            style={{
              ...styles.displayBtn,
              backgroundColor: isMyMatches ? 'white' : 'rgba(0, 0, 0, 0)',
            }}
          >
            <Text>My Matches</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsMyMatches(false)}
            style={{
              ...styles.displayBtn,
              backgroundColor: isMyMatches ? 'rgba(0, 0, 0, 0)' : 'white',
            }}
          >
            <Text>Others Matches</Text>
          </Pressable>
        </View>
        {loading && loadingOthers ? (
          <Loading />
        ) : (
          <>
            {isMyMatches ? (
              <>
                {myMatches.length > 0 ? (
                  showMathes(myMatches)
                ) : (
                  <NoMatches own={true} />
                )}
              </>
            ) : (
              <>
                {othersMatches.length > 0 ? (
                  showMathes(othersMatches)
                ) : (
                  <NoMatches own={false} />
                )}
              </>
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
  btnViewCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
  },
  displayBtn: {
    padding: 10,
    borderRadius: 10,
  },
});
