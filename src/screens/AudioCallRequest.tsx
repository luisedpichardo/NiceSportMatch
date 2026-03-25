import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useProfileImage } from '../hooks/useProfileImage';

export const AudioCallRequest = ({ route }) => {
  const { someone } = route.params;
  const { theme } = useTheme();
  const { imageUri } = useProfileImage(someone);

  return (
    <SafeAreaView style={[styles.cont, { backgroundColor: theme.secondary }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {someone}
      </Text>
      <Image source={{ uri: imageUri }} style={styles.img} />
      <View style={styles.bottomCont}>
        <View style={styles.option}>
          <Image
            source={require('../../assets/close.png')}
            style={styles.imgOpt}
          />
          <Text style={{ color: theme.textPrimary }}>Ignore</Text>
        </View>
        <View style={styles.option}>
          <Image
            source={require('../../assets/check.png')}
            style={styles.imgOpt}
          />
          <Text style={{ color: theme.textPrimary }}>Accept</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 30,
  },
  img: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: '100%',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  bottomCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  option: {
    alignItems: 'center',
  },
  imgOpt: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
});
