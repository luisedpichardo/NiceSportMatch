import { Alert, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { Loading } from '../components/Loading';
import { Maps } from '../components/Maps';
// Services
import { readAllMatchesService } from '../services/MatchService';
// Types
import { NavHomeTab, NavRoot } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<NavHomeTab, 'Map'>,
  NativeStackScreenProps<NavRoot>
>;

export const Main = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState({});

  // Set to load current positon
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = () => {
    readAllMatchesService()
      .then(res => {
        setMatches(res);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? <Loading /> : <Maps matches={matches} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
});
