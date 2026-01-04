import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { Background } from '../components/Background';
import { LoginForm } from '../components/LoginForm';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Navigation
import { NavAuthStack } from '../navigation/types';

type Props = NativeStackScreenProps<NavAuthStack, 'Login'>;

export const Login = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Background
      colors={[theme.surface, theme.secondary, theme.primary]}
      style={styles.container}
    >
      <View style={styles.topCont}>
        <Text style={{ ...styles.titleStyle, color: theme.textPrimary }}>
          {t('auth.log-in.title')}
        </Text>
      </View>
      <View style={styles.formContatiner}>
        <LoginForm />
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
    marginBottom: '5%',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '900',
    justifyContent: 'flex-end',
  },
  formContatiner: {
    flex: 1,
    margin: 30,
    marginTop: '20%',
    borderRadius: 25,
    padding: 20,
  },
});
