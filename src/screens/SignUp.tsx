import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Types
import { NavAuthStack } from '../navigation/types';
import { SignUpForm } from '../components/SignUpForm';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<NavAuthStack, 'SignUp'>;

export const SignUp = ({ navigation }: Props) => {
  return (
    <LinearGradient
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
      useAngle={true}
      angle={155}
    >
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Sign Up</Text>
      </View>
      <View style={styles.formContatiner}>
        <SignUpForm />
      </View>
    </LinearGradient>
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
    marginBottom: '5%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '900',
    justifyContent: 'flex-end',
  },
  formContatiner: {
    flex: 1,
    backgroundColor: 'white',
    margin: 30,
    marginTop: '20%',
    marginBottom: '20%',
    borderRadius: 25,
    padding: 30,
  },
});
