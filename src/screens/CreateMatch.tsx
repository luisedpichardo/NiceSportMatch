import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { CreateMatchForm } from '../components/CreateMatchForm';
// Types
import { MatchNavStack } from '../navigation/types';

type Props = NativeStackScreenProps<MatchNavStack, 'CreateMatch'>;

export const CreateMatch = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle:'Create Match',
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContatiner}>
        <CreateMatchForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  formContatiner: {
    flex: 1,
    marginVertical: '25%',
    padding: 30,
  },
});
