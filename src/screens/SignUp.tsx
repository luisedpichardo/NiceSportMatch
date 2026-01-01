import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { Background } from '../components/Background';
import { SignUpForm } from '../components/SignUpForm';
// Types
import { NavAuthStack } from '../navigation/types';

type Props = NativeStackScreenProps<NavAuthStack, 'SignUp'>;

export const SignUp = ({ navigation }: Props) => {
  return (
    <Background
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
    >
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Sign Up</Text>
      </View>
      <View style={styles.formContatiner}>
        <SignUpForm />
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: '30%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '900',
    justifyContent: 'flex-end',
  },
  formContatiner: {
    flex: 1,
    margin: 30,
    marginBottom: '20%',
    borderRadius: 25,
    padding: 20,
  },
});
