import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
} from 'react-native';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type SignUpInput = {
  title: string;
  placeholder: string;
  value: any;
  onChangeText: any;
  secureTextEntry: boolean;
  keyboardType: any;
  error: any;
  errorMessage: any;
};

export const CustomInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  error,
  errorMessage,
}: SignUpInput) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View>
      <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputField, { borderColor: theme.primary }]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && (
        <Text style={[styles.errorSty, { color: theme.error }]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 2,
    padding: 10,
    marginVertical: 5,
  },
  errorSty: {
    fontSize: 10,
  },
});
