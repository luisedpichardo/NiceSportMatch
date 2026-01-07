import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export const NoInternetAccess = () => {
  const { theme } = useTheme();

  return (
    <View testID="cont" style={styles.container}>
      <Text style={{ ...styles.title, color: theme.textPrimary }}>Oooops!</Text>
      <Text style={{ ...styles.subTit, color: theme.textSecondary }}>
        There is no internet connection!
      </Text>
      <Pressable>
        <Text>Try Again</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTit: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.85,
  },
});
