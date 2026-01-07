import { Image, StyleSheet, Text, View } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Utils
import { timeFormatHelper } from '../utils/functions/timeFormatHelper';
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

type Props = {
  day: any;
  time: any;
};

export const RigthSMatchPrev = ({ day, time }: Props) => {
  const { theme } = useTheme();

  return (
    <View testID="container" style={styles.container}>
      <View style={styles.itemInfo}>
        <Text style={{ ...styles.txt, color: theme.textPrimary }}>
          {dateFormatHelper(day)}
          {'  '}
        </Text>
        <Image
          source={require('../../assets/calendar.png')}
          style={{ ...styles.icnStyle, tintColor: theme.iconPrimary }}
        />
      </View>
      <View style={styles.itemInfo}>
        <Text style={{ ...styles.txt, color: theme.textPrimary }}>
          {timeFormatHelper(time)}
          {'  '}
        </Text>
        <Image
          source={require('../../assets/clock.png')}
          style={{ ...styles.icnStyle, tintColor: theme.iconPrimary }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
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
  txt: {
    alignSelf: 'center',
  },
});
