import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loading = () => {
  return (
    <View testID="container" style={styles.container}>
      <ActivityIndicator testID="activityIndicator" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
