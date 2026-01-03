import { StyleSheet, Switch, Text, View } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Stores
import { useStore } from '../stores/userStore';

export const SwitchSettingsOpt = () => {
  const setColorScheme = useStore(state => state.setTheme);
  const { theme, colorScheme } = useTheme();

  const toggleSwitch = () => {
    const nextTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(nextTheme);
  };

  return (
    <View style={{ ...styles.btn, backgroundColor: theme.transparent }}>
      <Text style={{ ...styles.txt, color: theme.border }}>
        {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
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
