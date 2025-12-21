import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { MatchNavStack } from '../navigation/types';

type Props = NativeStackScreenProps<MatchNavStack, 'CreateMatch'>;

export const CreateMatch = ({ navigation }: Props) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Text style={{ fontSize: 40 }}>Create match</Text>
    </View>
  );
};
