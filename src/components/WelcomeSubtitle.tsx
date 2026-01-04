import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';

export const WelcomeSubtitle = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View>
      <Text style={{ ...styles.center, color: theme.textPrimary }}>
        {t('auth.welcome.welcome-img.welcome-subtitle.one')}
      </Text>
      <Text style={{ ...styles.center, color: theme.textPrimary }}>
        {t('auth.welcome.welcome-img.welcome-subtitle.two')}
      </Text>
      <Text style={{ ...styles.center, color: theme.textPrimary }}>
        {t('auth.welcome.welcome-img.welcome-subtitle.three')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
});
