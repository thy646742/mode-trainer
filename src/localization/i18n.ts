import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationZH from './zh.json';

const resources = {
    en:{
        translation: translationEN
    },
    zh:{
        translation: translationZH
    }
};

i18n.use(initReactI18next);
i18n.init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;