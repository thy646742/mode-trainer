import { useState } from 'react';
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';

function LanguageSwitch() {
    const [ language, setLanguage ] = useState<string>('en');

    const { i18n } = useTranslation();

    const changeLanguage = (newLanguage: string) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };
    
    return (
        <Button.Group>
            <Button
                variant={language == 'zh' ? 'filled' : 'outline' }
                size='compact-sm'
                onClick={() => changeLanguage('zh')}
            >
                中文
            </Button>
            <Button
                variant={language == 'en' ? 'filled' : 'outline' }
                size='compact-sm'
                onClick={() => changeLanguage('en')}
            >
                English
            </Button>
        </Button.Group>
    );
}

export default LanguageSwitch;