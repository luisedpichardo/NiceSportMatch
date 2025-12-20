import { useNavigation } from '@react-navigation/native';
import { RightHdrBtn } from './RightHdrBtn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavRoot } from '../navigation/types';

export const OpenSettings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavRoot>>();
  return (
    <RightHdrBtn
      text="Settings"
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
