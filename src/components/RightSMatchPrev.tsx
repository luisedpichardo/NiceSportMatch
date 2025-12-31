import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  day: any;
  time: any;
};

export const RigthSMatchPrev = ({ day, time }: Props) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <View style={styles.itemInfo}>
        <Text>{day}</Text>
        <Image
          source={require('../../assets/calendar.png')}
          style={styles.icnStyle}
        />
      </View>
      <View style={styles.itemInfo}>
        <Text>{time}</Text>
        <Image
          source={require('../../assets/clock.png')}
          style={styles.icnStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icnStyle: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 3,
  },
});
