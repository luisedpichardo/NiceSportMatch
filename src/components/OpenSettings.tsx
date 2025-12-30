import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Components
import { RightHdrBtn } from './RightHdrBtn';
// Navigation
import { NavRoot } from '../navigation/types';

export const OpenSettings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavRoot>>();
  return (
    <RightHdrBtn
      text="Settings"
      color="black"
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
