import { View, Text, TextInput, StyleSheet } from 'react-native';

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
  return (
    <View>
      <Text style={{color: 'green', fontWeight:'bold'}}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputField}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorSty}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    // borderWidth: 3,
    borderBottomWidth:2,
    // borderRadius: 10,
    borderColor: 'green',
    padding: 10,
    marginVertical: 5,
  },
  errorSty: {
    fontSize: 10,
    color: 'red',
  },
});
