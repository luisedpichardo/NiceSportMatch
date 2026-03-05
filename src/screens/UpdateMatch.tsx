import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { UpdateMatchForm } from '../components/UpdateMatchForm';
import { Loading } from '../components/Loading';
// Hooks
import { useTheme } from '../hooks/useTheme';
import { useMatch } from '../hooks/useMatch';
// Types
import { MatchNavStack } from '../navigation/types';

type Props = NativeStackScreenProps<MatchNavStack, 'UpdateMatch'>;

export const UpdateMatch = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const id = route.params?.matchId;
  const { match, loading } = useMatch(id);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('home-tabs.match-stack.update.title'),
    });
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={styles.formContatiner}>
        {loading ? (
          <Loading />
        ) : (
          <UpdateMatchForm match={match} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContatiner: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: '30%',
    borderRadius: 25,
    margin: 30,
  },
});
