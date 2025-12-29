import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
// Components
import { CreateMatchForm } from '../components/CreateMatchForm';
// Types
import { MatchNavStack } from '../navigation/types';
import { Background } from '../components/Background';

type Props = NativeStackScreenProps<MatchNavStack, 'CreateMatch'>;

export const CreateMatch = ({ navigation }: Props) => {
  return (
    <Background
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
      useAngle={true}
      angle={75}
    >
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Create match</Text>
      </View>
      <View style={styles.formContatiner}>
        <CreateMatchForm />
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
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: '30%',
    marginBottom: '5%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '600',
    justifyContent: 'flex-end',
  },
  formContatiner: {
    flex: 1,
    marginBottom: '30%',
    padding: 30,
  },
});
