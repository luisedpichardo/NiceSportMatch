import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { Background } from '../components/Background';
import { WelcomeImg } from '../components/WelcomeImg';
// Services
import { analyticsService, types } from '../services/AnalyticsService';
// Types
import { NavAuthStack } from '../navigation/types';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = NativeStackScreenProps<NavAuthStack, 'Welcome'>;

export const Welcome = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Background
      colors={[theme.surface, theme.secondary, theme.primary]}
      style={styles.container}
    >
      <WelcomeImg />
      <View style={styles.optCont}>
        <TouchableOpacity
          onPress={() => {
            analyticsService(types.BUTTON, 'User attemps to log in to app');
            navigation.navigate('Login');
          }}
          style={{ ...styles.btnStyle, backgroundColor: theme.primary }}
        >
          <Text style={{ ...styles.textStyle, color: theme.surface }}>
            {t('auth.welcome.log-in')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            analyticsService(types.BUTTON, 'User attemps to sign up to app');
            navigation.navigate('SignUp');
          }}
          style={{ ...styles.btnStyle, backgroundColor: theme.surface }}
        >
          <Text style={styles.textStyle}>{t('auth.welcome.sign-up')}</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
    marginHorizontal: 50,
  },
  btnStyle: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 35,
  },
  textStyle: {
    fontSize: 20,
  },
});
