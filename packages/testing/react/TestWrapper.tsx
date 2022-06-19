import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '@nezhos/i18n';

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en-US',
        debug: true,

        interpolation: {
            escapeValue: false,
        }
    });


function TestWrapper({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}

export default TestWrapper;
