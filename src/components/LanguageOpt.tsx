import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type LangOpt = {
  onPress: any;
  text: string;
};

export const LanguageOpt = ({ onPress, text }: LangOpt) => {
  return (
    <TouchableOpacity style={styles.flagBtn} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flagBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    margin: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
