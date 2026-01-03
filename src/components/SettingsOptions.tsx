import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';

type Props = {
  onPress: any;
  text: string;
};

export const SettingsOptions = ({ onPress, text }: Props) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...styles.btn, backgroundColor: theme.transparent }}
      onPress={onPress}
    >
      <Text style={{ ...styles.txt, color: theme.border }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 25,
    marginVertical: 10,
  },
  txt: {
    fontSize: 25,
  },
});
