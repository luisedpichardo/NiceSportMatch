import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { Maps } from '../components/Maps';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Types
import { NavHomeTab, NavRoot } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<NavHomeTab, 'Map'>,
  NativeStackScreenProps<NavRoot>
>;

export const Main = ({ navigation }: Props) => {
  const { theme } = useTheme();

  // useEffect(() => {
  // // Error handling to show Error Display
  //   throw new Error('Error');
  // });

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Maps />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
