import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
// Components
import { CreateMatchForm } from '../components/CreateMatchForm';
// Types
import { MatchNavStack } from '../navigation/types';

type Props = NativeStackScreenProps<MatchNavStack, 'CreateMatch'>;

export const CreateMatch = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Create match</Text>
      </View>
      <View style={styles.formContatiner}>
        <CreateMatchForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
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
    color: 'white',
    justifyContent: 'flex-end',
  },
  formContatiner: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginBottom: '30%',
    borderRadius: 25,
    padding: 30,
  },
});
