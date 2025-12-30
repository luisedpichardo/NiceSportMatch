import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { UpdateMatchForm } from '../components/UpdateMatchForm';
// Types
import { MatchNavStack } from '../navigation/types';

type Props = NativeStackScreenProps<MatchNavStack, 'UpdateMatch'>;

export const UpdateMatch = ({ navigation, route }: Props) => {
  const match = route.params?.match;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Update Match',
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContatiner}>
        <UpdateMatchForm match={match} navigation={navigation} />
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
    marginHorizontal: 30,
    marginVertical: '30%',
    borderRadius: 25,
    margin: 30,
  },
});
