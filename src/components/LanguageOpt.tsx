import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type LangOpt = {
  onPress: any;
  text: string;
};

export const LanguageOpt = ({ onPress, text }: LangOpt) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

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
