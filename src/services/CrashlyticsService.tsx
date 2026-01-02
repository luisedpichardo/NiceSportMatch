import crashlytics from '@react-native-firebase/crashlytics';

export async function onSignUpService(user: any) {
  crashlytics().log('User signed up');
  await Promise.all([
    crashlytics().setUserId(user.username),
    crashlytics().setAttributes({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    }),
  ]);
}

export async function onLogInService(user: any) {
  crashlytics().log('User logging in.');
  await Promise.all([
    crashlytics().setUserId(user.email),
    crashlytics().setAttributes({
      email: user.email,
    }),
  ]);
}

export async function crashService(error: any) {
  crashlytics().recordError(error);
}

async function toggleCrashlytics(enabled: boolean, setEnabled: any) {
  await crashlytics()
    .setCrashlyticsCollectionEnabled(!enabled)
    .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
}
