import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'Main'>;

export const Main = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
});
