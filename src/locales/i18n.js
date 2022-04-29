import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './index.js';

const i18instance = i18n.createInstance();

i18instance
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: resources.ru,
    },
  });

export default i18instance;
