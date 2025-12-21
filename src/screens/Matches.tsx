import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MatchPrev } from '../components/MatchPrev';

export const Matches = () => {
  // Start Dummy Data
  const matches = [
    {
      id: 123,
      address: '123 abc street',
      publisher: 'username',
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          marginTop: '30%',
          marginBottom: '5%'
        }}
      >
        <Text style={styles.titleStyle}>Matches</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Image source={require('../../assets/add.png')} style={styles.img} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.formContatiner}>
        {matches.map(elem => {
          return <MatchPrev key={elem.id} match={elem} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
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
