import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPersistedLang = async () => {
  try {
    const lang = await AsyncStorage.getItem('chat-app-language');
    if (!lang) return 'es';
    return lang;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
