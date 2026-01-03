import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { UpdateMatchForm } from '../components/UpdateMatchForm';
// Stores
import { useStore } from '../stores/userStore';
// Types
import { MatchNavStack } from '../navigation/types';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = NativeStackScreenProps<MatchNavStack, 'UpdateMatch'>;

export const UpdateMatch = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const match = route.params?.match;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('home-tabs.match-stack.update.title'),
    });
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={styles.formContatiner}>
        <UpdateMatchForm match={match} navigation={navigation} />
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
