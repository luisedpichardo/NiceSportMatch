import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
// Components
import { NoMatches } from '../components/NoMatches';
import { Loading } from '../components/Loading';
import { MatchPrev } from '../components/MatchPrev';
// Hooks
import { useUserMatches } from '../hooks/useUserMatches';
import { useTheme } from '../hooks/useTheme';
import { useInternet } from '../hooks/useInternet';
// Services
import { analyticsService, types } from '../services/AnalyticsService';

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

export const MyMatches = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { matches, loading } = useUserMatches('mine');
  const { internetAccess } = useInternet();

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
              <NoMatches own={true} />
            )}
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          analyticsService(types.BUTTON, 'User Attemps to create a match');
          navigation.navigate('CreateMatch');
        }}
        style={{
          ...styles.btn,
          shadowColor: theme.cardShadow,
          backgroundColor: theme.primary,
        }}
        disabled={!internetAccess}
      >
        <Text style={styles.btnTxt}>
          {t('home-tabs.match-stack.matches.btn-txt')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 160,
    padding: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
    color: 'white',
  },
  matchesContatiner: {
    flex: 4,
    marginVertical: 10,
    marginBottom: '33%',
  },
});
