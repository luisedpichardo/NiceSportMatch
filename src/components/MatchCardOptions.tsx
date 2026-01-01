import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { MatchNotOwnOpt } from './MatchNotOwnOpt';
// Types
import { MatchNavStack } from '../navigation/types';

type Props = {
  publisher: string;
  own: boolean;
  match: any;
};

export const MatchCardOptions = ({ publisher, own, match }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const nav = navigation as NativeStackScreenProps<
    MatchNavStack,
    'Matches'
  >['navigation'];

  return (
    <>
      {own ? (
        <TouchableOpacity
          onPress={() => nav.navigate('UpdateMatch', { match })}
          style={styles.btn}
        >
          <Text style={styles.txt}>
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
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: 'lightgreen',
  },
  txt: {
    fontWeight: 'bold',
  },
});
