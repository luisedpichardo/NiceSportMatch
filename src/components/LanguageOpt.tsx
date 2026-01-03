import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';

type LangOpt = {
  onPress: any;
  text: string;
};

export const LanguageOpt = ({ onPress, text }: LangOpt) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.flagBtn, { backgroundColor: theme.transparent }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.border }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flagBtn: {
    borderRadius: 25,
    margin: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
