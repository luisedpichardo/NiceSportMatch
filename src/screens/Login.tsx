import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
// Types
import { NavAuthStack } from '../navigation/types';
import { LoginForm } from '../components/LoginForm';

type Props = NativeStackScreenProps<NavAuthStack, 'Login'>;

export const Login = ({ navigation }: Props) => {
  return (
    <LinearGradient
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
      useAngle={true}
      angle={115}
    >
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Welcome</Text>
      </View>
      <View style={styles.formContatiner}>
        <LoginForm />
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
    marginTop: '30%',
    marginBottom: '30%',
    borderRadius: 25,
    padding: 30,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 5,
  },
});
