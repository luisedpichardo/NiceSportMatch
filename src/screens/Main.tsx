import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
// Components
import { RightHdrBtn } from '../components/RightHdrBtn';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'Main'>;

export const Main = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
    });
  });

  const headerRight = () => {
    return (
      <RightHdrBtn
        onPress={() => navigation.navigate('Settings')}
        text="Settings"
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
});
