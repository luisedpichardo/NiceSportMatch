import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
// Stores
import { useStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

export const SwitchSettingsOpt = () => {
  const colorScheme = useStore(state => state.theme);
  const setColorScheme = useStore(state => state.setTheme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      setColorScheme('light');
    } else {
      setColorScheme('dark');
    }
  };

  return (
    <View style={{ ...styles.btn, backgroundColor: theme.transparent }}>
      {isEnabled ? (
        <Text style={{ ...styles.txt, color: theme.border }}>Dark Mode</Text>
      ) : (
        <Text style={{ ...styles.txt, color: theme.border }}>Light Mode</Text>
      )}

      <Switch
        trackColor={{ false: theme.secondary, true: theme.secondary }}
        thumbColor={theme.primary}
        onValueChange={toggleSwitch}
        value={isEnabled}
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
