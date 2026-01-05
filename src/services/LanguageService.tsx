import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

export const getPersistedLang = async () => {
  try {
    const resources = [
      {
        en: 'en',
        es: 'es',
      },
    ];
    const lang = await AsyncStorage.getItem('chat-app-language');
    const bestLanguage = RNLocalize.findBestLanguageTag(Object.keys(resources));
    if (!lang) return bestLanguage;
    return lang;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
