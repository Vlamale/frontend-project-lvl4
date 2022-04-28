import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './index.js';

i18n
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

export default i18n;
