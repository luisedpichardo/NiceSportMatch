import { StyleSheet, Text, View } from 'react-native';

export const WelcomeSubtitle = () => {
  return (
    <View>
      <Text style={styles.center}>We are here to help you look for a team</Text>
      <Text style={styles.center}>or</Text>
      <Text style={styles.center}>
        Look for a player when your team needs a player
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
});
