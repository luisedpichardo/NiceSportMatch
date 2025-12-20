import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: any;
  text: string;
};

export const SettingsOptions = ({ onPress, text }: Props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 25,
    marginVertical: 15,
  },
  txt: {
    fontSize: 25,
    color: 'white',
  },
});
