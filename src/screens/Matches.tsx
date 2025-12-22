import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { MatchPrev } from '../components/MatchPrev';
import { Loading } from '../components/Loading';
// Stores
import { useUserStore } from '../stores/userStore';
// Types
import { MatchNavStack, NavHomeTab } from '../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MatchNavStack, 'Matches'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Matches = ({ navigation }: Props) => {
  const matchStackNavigation = navigation as NativeStackScreenProps<
    MatchNavStack,
    'Matches'
  >['navigation'];

  const { username } = useUserStore.getState();

  // Start Dummy Data
  const matches = [
    {
      id: 123,
      address: '123 abc street',
      publisher: 'Testone',
      day: '01/31/2025',
      time: '14:00',
      status: 'confirmed',
    },
    {
      id: 124,
      address: '123 abc street',
      publisher: 'username',
      day: '01/31/2025',
      time: '14:00',
      status: 'confirmed',
    },
    {
      id: 125,
      address: '123 abc street',
      publisher: 'username',
      day: '01/21/2025',
      time: '15:00',
      status: 'pending',
    },
  ];
  // End Dummy Data

  return (
    <View style={styles.container}>
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Matches</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => matchStackNavigation.navigate('CreateMatch')}
        >
          <Image source={require('../../assets/add.png')} style={styles.img} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.formContatiner}>
        {username ? (
          <>
            {matches.map(elem => {
              return <MatchPrev key={elem.id} match={elem} />;
            })}
          </>
        ) : (
          <Loading />
        )}
      </ScrollView>
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
    backgroundColor: 'gray',
    marginHorizontal: 30,
    marginBottom: '30%',
    borderRadius: 25,
    padding: 30,
  },
  addBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgreen',
    borderRadius: '50%',
  },
  img: {
    height: 50,
    width: 50,
  },
});
