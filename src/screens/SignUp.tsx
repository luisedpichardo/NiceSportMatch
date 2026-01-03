import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { Background } from '../components/Background';
import { SignUpForm } from '../components/SignUpForm';
// Stores
import { useStore } from '../stores/userStore';
// Types
import { NavAuthStack } from '../navigation/types';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = NativeStackScreenProps<NavAuthStack, 'SignUp'>;

export const SignUp = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Background
      colors={[theme.surface, theme.secondary, theme.primary]}
      style={styles.container}
    >
      <View style={styles.topCont}>
        <Text style={styles.titleStyle}>{t('auth.sign-up.title')}</Text>
      </View>
      <View style={styles.formContatiner}>
        <SignUpForm />
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: '30%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '900',
    justifyContent: 'flex-end',
  },
  formContatiner: {
    flex: 1,
    margin: 30,
    marginBottom: '20%',
    borderRadius: 25,
    padding: 20,
  },
});
