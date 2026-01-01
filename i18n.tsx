import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
// import de from './src/translations/de.json';
import en from './src/translations/en.json';
import es from './src/translations/es.json';
// import fr from './src/translations/fr.json';
// import it from './src/translations/it.json';

i18n.use(initReactI18next).init({
  resources: {
    // de: { translation: de },
    en: { translation: en },
    es: { translation: es },
    // fr: { translation: fr },
    // it: { translation: it },
  },
  lng: 'es', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;