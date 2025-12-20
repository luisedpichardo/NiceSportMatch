import { View, Text, TextInput, StyleSheet } from 'react-native';

type SignUpInput = {
  title: string;
  placeholder: string;
  value: any;
  onChangeText: any;
  secureTextEntry: boolean;
  keyboardType: any;
};

export const SignUpLoginInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}: SignUpInput) => {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputField}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'green',
    padding: 10,
    marginVertical: 5,
  },
});
