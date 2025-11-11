import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import pt from '../locales/PT.json';
import es from '../locales/ES.json';

const LANG_STORAGE_KEY = 'appLanguage';

const resources = {
  pt: { translation: pt },
  es: { translation: es },
};

const getStoredLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem(LANG_STORAGE_KEY);
    if (lang) return lang;
  } catch {}
  return null;
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const storedLang = await getStoredLanguage();
    if (storedLang) {
      callback(storedLang);
    } else {
      // usa idioma do sistema
      const locale = Localization.locale.startsWith('es') ? 'es' : 'pt';
      callback(locale);
    }
  },
  init: () => {},
  cacheUserLanguage: (lang) => {
    AsyncStorage.setItem(LANG_STORAGE_KEY, lang);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false, // react já faz escape
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;