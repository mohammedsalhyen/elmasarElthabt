import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';

import ar_translation from "./locales/ar/translation.json";
import en_translation from "./locales/en/translation.json";
import zh_translation from "./locales/zh/translation.json";

const resources = {
    ar: {
        translation: ar_translation,
    },
    en: {
        translation: en_translation,
    },
    zh: {
        translation: zh_translation,
    },
};
const language = Cookies.get('i18next') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: language, // Set the language from the cookie
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

// Save the language in cookies whenever it changes
i18n.on('languageChanged', (lng) => {
    Cookies.set('i18next', lng, { expires: 7 });

});

export default i18n;
