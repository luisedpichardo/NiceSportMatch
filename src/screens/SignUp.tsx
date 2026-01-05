import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { Background } from '../components/Background';
import { SignUpForm } from '../components/SignUpForm';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Types
import { NavAuthStack } from '../navigation/types';

type Props = NativeStackScreenProps<NavAuthStack, 'SignUp'>;

export const SignUp = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Background
        colors={[theme.surface, theme.secondary, theme.primary]}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.topCont}>
            <Text style={{ ...styles.titleStyle, color: theme.textPrimary }}>
              {t('auth.sign-up.title')}
            </Text>
          </View>
          <View style={styles.formContatiner}>
            <SignUpForm />
          </View>
        </ScrollView>
      </Background>
    </KeyboardAvoidingView>
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
