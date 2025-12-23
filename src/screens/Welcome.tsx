import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { NavAuthStack } from '../navigation/types';

type Props = NativeStackScreenProps<NavAuthStack, 'Welcome'>;

export const Welcome = ({ navigation }: Props) => {
  return (
    <View>
      <Text style={{ fontSize: 50 }}>Welcome</Text>
    </View>
  );
};
