import { Image, StyleSheet, Text, View } from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';

type Props = {
  day: any;
  time: any;
};

export const RigthSMatchPrev = ({ day, time }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={{ justifyContent: 'center' }}>
      <View style={styles.itemInfo}>
        <Text style={{ color: theme.textPrimary }}>{day}</Text>
        <Image
          source={require('../../assets/calendar.png')}
          style={{ ...styles.icnStyle, tintColor: theme.iconPrimary }}
        />
      </View>
      <View style={styles.itemInfo}>
        <Text style={{ color: theme.textPrimary }}>{time}</Text>
        <Image
          source={require('../../assets/clock.png')}
          style={{ ...styles.icnStyle, tintColor: theme.iconPrimary }}
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
