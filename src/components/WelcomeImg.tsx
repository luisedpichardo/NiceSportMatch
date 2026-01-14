import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
// Components
import { WelcomeSubtitle } from './WelcomeSubtitle';
// Hooks
import { useTheme } from '../hooks/useTheme';

export const WelcomeImg = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={styles.topCont}>
      <Text style={{ ...styles.titleStyle, color: theme.textPrimary }}>
        {t('auth.welcome.welcome-img.title')}
      </Text>
      <WelcomeSubtitle />
      <FastImage
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
