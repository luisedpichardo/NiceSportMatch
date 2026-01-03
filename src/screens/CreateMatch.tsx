import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { CreateMatchForm } from '../components/CreateMatchForm';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Types
import { MatchNavStack } from '../navigation/types';

type Props = NativeStackScreenProps<MatchNavStack, 'CreateMatch'>;

export const CreateMatch = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('home-tabs.match-stack.create.title'),
    });
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={styles.formContatiner}>
        <CreateMatchForm navigation={navigation} />
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
    marginVertical: '25%',
    padding: 30,
  },
});
