import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import en from './src/translations/en.json';
import es from './src/translations/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
