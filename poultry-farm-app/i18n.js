// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import si from './locales/si.json';

// Import the polyfill
import 'intl-pluralrules';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        si: {
            translation: si,
        },
    },
    lng: Localization.locale.split('-')[0], // Detect language from device settings
    fallbackLng: 'en', // Fallback language
    interpolation: {
        escapeValue: false, // React already escapes by default
    },
});

export default i18n;
