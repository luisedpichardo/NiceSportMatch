import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { MatchNotOwnOpt } from './MatchNotOwnOpt';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Types
import { MatchNavStack } from '../navigation/types';
import { useInternet } from '../hooks/useInternet';

type Props = {
  publisher: string;
  own: boolean;
  match: any;
};

export const MatchCardOptions = ({ publisher, own, match }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { internetAccess } = useInternet();
  const nav = navigation as NativeStackScreenProps<
    MatchNavStack,
    'Matches'
  >['navigation'];

  const goToUpdate = () => {
    if (!internetAccess) {
      Alert.alert(t('no-internet'));
      return;
    }
    nav.navigate('UpdateMatch', { match });
  };

  return (
    <>
      {own ? (
        <TouchableOpacity
          onPress={() => goToUpdate()}
          style={{
            ...styles.btn,
            backgroundColor: theme.secondary,
            borderColor: theme.primary,
          }}
        >
          <Text style={{ ...styles.txt, color: theme.textPrimary }}>
            {t('home-tabs.match-stack.matches.prev.modify')}
          </Text>
        </TouchableOpacity>
      ) : (
        <MatchNotOwnOpt _id={match._id} publisher={publisher} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  txt: {
    fontWeight: 'bold',
  },
});
