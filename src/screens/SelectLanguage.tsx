import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Components
import { LanguageOpt } from '../components/LanguageOpt';
// Services
import { analyticsService, types } from '../services/AnalyticsService';
// Stores
import { useStore } from '../stores/userStore';
// Types
import { NavRoot } from '../navigation/types';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = NativeStackScreenProps<NavRoot, 'SelectLanguage'>;

export const SelectLanguage = ({ navigation }: Props) => {
  const { i18n, t } = useTranslation();
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('settings.lang.title'),
    });
  });

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    // Persist choice
    AsyncStorage.setItem('chat-app-language', language);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={styles.langOpt}>
        <LanguageOpt
          onPress={() => {
            analyticsService(
              types.BUTTON,
              'User selects changing language into english',
            );
            changeLanguage('en');
          }}
          text={t('settings.lang.american')}
        />
        <LanguageOpt
          onPress={() => {
            analyticsService(
              types.BUTTON,
              'User selects changing language into spanish',
            );
            changeLanguage('es');
          }}
          text={t('settings.lang.mexican')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '30%',
    paddingBottom: '30%',
  },
  langOpt: {
    flex: 4,
    margin: 30,
    justifyContent: 'center',
  },
});
