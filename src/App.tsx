import { useState, useMemo, useEffect } from 'react';
import { useDisclosure, useElementSize, useViewportSize } from '@mantine/hooks';
import { createTheme, MantineProvider, AppShell, Text, Stack, Button, Group, Drawer } from '@mantine/core';
import Score from './components/Score';
import Keyboard from './components/Keyboard';
import QuestionDisplay from './components/QuestionDisplay';
import Configuration from './components/Configuration';
import LanguageSwitch from './components/LanguageSwitch';
import { useTranslation } from 'react-i18next';
import { getScaleNotes } from './utils/getScaleNotes';
import '@mantine/core/styles.css';
import classes from '/src/App.module.css';

const globalTheme = createTheme({
    primaryColor: 'violet',
    autoContrast: true
});

const defaultConfig: Config = {
    timeMode: 'untimed',
    timeLimit: 30
};

function App() {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ keySignature, setKeySignature ] = useState<Key>('0');
    const [ scaleId, setScaleId ] = useState<number>(0);
    const [ correct, setCorrect ] = useState<boolean>(true);
    const [ complete, setComplete ] = useState<boolean>(false);
    const [ configOpen , setConfigOpen ] = useDisclosure(false);
    const [ config, setConfig ] = useState<Config>(defaultConfig);
    const [ currentConfig, setCurrentConfig ] = useState<Config>(defaultConfig);
    const [ stickFooter, setStickFooter ] = useState<boolean>(true);

    const scaleNotes = useMemo(() => getScaleNotes(keySignature, scaleId), [keySignature, scaleId]);

    const mainSize = useElementSize();
    const viewportSize = useViewportSize();

    const { t } = useTranslation();

    useEffect(() => {
        setStickFooter(mainSize.height + 150 <= viewportSize.height);
    }, [mainSize, viewportSize]);

    const addNote = (note: Note) => {
        let noteIndex = notes.length;
        if(!correct){
            noteIndex--;
        }
        if(noteIndex >= 7){
            return;
        }
        setNotes(prevNotes => {
            let newNotes = [...prevNotes];
            if(correct){
                newNotes = prevNotes.concat(note);
            }
            else{
                newNotes[noteIndex] = note;
            }
            return newNotes;
        });
        const check = note.pitch == scaleNotes[noteIndex].pitch && note.accidental == scaleNotes[noteIndex]. accidental;
        setCorrect(check);
        setComplete(check && noteIndex == 6);
    };

    const skip = () => {
        setNotes([...scaleNotes]);
        setCorrect(true);
        setComplete(true);
    };

    const newQuestion = () => {
        const keySignatures: Key[] = ['0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '-1', '-2', '-3', '-4', '-5', '-6', '-7'];
        setNotes([]);
        setCorrect(true);
        setComplete(false);
        setKeySignature(keySignatures[Math.floor(Math.random() * 15)]);
        setScaleId(Math.floor(Math.random() * 7));
    };

    const applyConfig = () => {
        setConfig(currentConfig);
        setConfigOpen.close();
    };
    
    const discardConfig = () =>{
        setCurrentConfig(config);
        setConfigOpen.close();
    };

    return (
        <MantineProvider theme={globalTheme}>
            <AppShell header={{ height: 50 }} footer={{ height: 100, offset: stickFooter}}>
                <AppShell.Header>
                    <Group justify='space-between' className={classes.titleWrapper}>
                        <Text span className={classes.titleText}>Mode Trainer | 调式音阶练习器</Text>
                        <LanguageSwitch/>
                    </Group>
                </AppShell.Header>
                <AppShell.Main>
                    <Stack ref={mainSize.ref} align='center' justify='flex-start' className={classes.mainStack} gap='md'>
                        <QuestionDisplay keySignature={keySignature} scaleId={scaleId}/>
                        <Score notes={notes} correct={correct}/>
                        <Keyboard addNote={addNote} disabled={complete}/>
                        <Group>
                            <Button onClick={skip} disabled={complete} variant='light'>{t('main.showanswer')}</Button>
                            <Button onClick={newQuestion} disabled={!complete}>{t('main.nextquestion')}</Button>
                            <Button onClick={setConfigOpen.open}>{t('main.configure')}</Button>
                        </Group>
                        <Drawer position='right' opened={configOpen} onClose={discardConfig} title={t('config.title')}>
                            <Configuration
                                config={currentConfig}
                                setConfig={setCurrentConfig}
                                onSubmit={applyConfig}
                                onDiscard={discardConfig}
                            />
                        </Drawer>
                    </Stack>
                </AppShell.Main>
                <AppShell.Footer className={stickFooter ? '' : classes.footerWrapperRelative}>
                    <Group className={classes.footer}>
                        <Text className={classes.footerText}>
                            Mode Trainer | 调式音阶练习器<br/>
                            Developed by thy646742<br/>
                            Made with Mantine
                        </Text>
                    </Group>
                </AppShell.Footer>
            </AppShell>
        </MantineProvider>
    );
};

export default App;