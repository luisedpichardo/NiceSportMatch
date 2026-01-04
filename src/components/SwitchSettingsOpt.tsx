import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Stores
import { userStore } from '../stores/userStore';

export const SwitchSettingsOpt = () => {
  const setColorScheme = userStore(state => state.setTheme);
  const { theme, colorScheme } = useTheme();
  const { t } = useTranslation();

  const toggleSwitch = () => {
    const nextTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(nextTheme);
  };

  return (
    <View style={{ ...styles.btn, backgroundColor: theme.transparent }}>
      <Text style={{ ...styles.txt, color: theme.border }}>
        {colorScheme === 'dark'
          ? t('settings.dark-theme')
          : t('settings.ligth-theme')}
      </Text>

      <Switch
        trackColor={{ false: theme.secondary, true: theme.secondary }}
        thumbColor={theme.primary}
        onValueChange={toggleSwitch}
        value={colorScheme === 'dark'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingVertical: 25,
    marginVertical: 10,
  },
  txt: {
    fontSize: 25,
  },
});
