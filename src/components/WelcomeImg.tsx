import { Image, StyleSheet, Text, View } from 'react-native';

export const WelcomeImg = () => {
  return (
    <View style={styles.topCont}>
      <Text style={styles.titleStyle}>Welcome</Text>
      <Image
        source={require('../../assets/team.png')}
        style={styles.imgStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topCont: {
    alignItems: 'center',
    alignContent: 'space-around',
    paddingHorizontal: 30,
    marginTop: '30%',
    marginBottom: '5%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '900',
    justifyContent: 'flex-end',
  },
  imgStyle: {
    marginTop: 30,
    width: 230,
    height: 230,
  },
});
