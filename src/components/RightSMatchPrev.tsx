import { Image, StyleSheet, Text, View } from 'react-native';
// Stores
import { useStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = {
  day: any;
  time: any;
};

export const RigthSMatchPrev = ({ day, time }: Props) => {
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={{ justifyContent: 'center' }}>
      <View style={styles.itemInfo}>
        <Text>{day}</Text>
        <Image
          source={require('../../assets/calendar.png')}
          style={{ ...styles.icnStyle, tintColor: theme.iconSecondary }}
        />
      </View>
      <View style={styles.itemInfo}>
        <Text>{time}</Text>
        <Image
          source={require('../../assets/clock.png')}
          style={{ ...styles.icnStyle, tintColor: theme.iconSecondary }}
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
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 3,
  },
});
