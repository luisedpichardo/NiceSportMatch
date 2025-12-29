import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
// Components
import { MatchPrev } from '../components/MatchPrev';
import { Loading } from '../components/Loading';
// Services
import { readOwnUsersMatchesService } from '../services/MatchService';
// Stores
import { useUserStore } from '../stores/userStore';
// Types
import { MatchNavStack, NavHomeTab } from '../navigation/types';
import { Background } from '../components/Background';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MatchNavStack, 'Matches'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Matches = ({ navigation }: Props) => {
  const username = useUserStore(state => state.username);
  const [matches, setMatches] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (username) {
        readOwnUsersMatchesService(username).then(res => {
          if (isActive) setMatches(res);
        });
      }
      // Do not keep assigning matches
      return () => {
        isActive = false;
      };
    }, [username]),
  );

  return (
    <Background
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
      useAngle={true}
      angle={55}
    >
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>Matches</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateMatch')}>
          <Image source={require('../../assets/add.png')} style={styles.img} />
        </TouchableOpacity>
      </View>
      <View style={styles.matchesContatiner}>
        {username ? (
          <FlatList
            data={matches}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return <MatchPrev match={item} />;
            }}
          />
        ) : (
          <Loading />
        )}
      </View>
    </Background>
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
    justifyContent: 'flex-end',
  },
  matchesContatiner: {
    flex: 1,
    marginBottom: '30%',
    borderRadius: 25,
    padding: 20,
    paddingVertical: 30,
  },
  img: {
    height: 40,
    width: 40,
  },
});
