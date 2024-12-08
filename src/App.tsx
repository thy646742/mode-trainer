import { useState, useMemo } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { createTheme, MantineProvider, AppShell, Title, Container, Text, Stack, Button, Group, Drawer } from '@mantine/core';
import Score from './components/Score';
import Keyboard from './components/Keyboard';
import QuestionDisplay from './components/QuestionDisplay';
import Configuration from './components/Configuration';
import { getScaleNotes } from './utils/getScaleNotes';
import '@mantine/core/styles.css';

const globalTheme = createTheme({
    primaryColor: 'violet'
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
    
    const scaleNotes = useMemo(() => getScaleNotes(keySignature, scaleId), [keySignature, scaleId]);

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
            <AppShell header={{ height: 60 }}>
                <AppShell.Header>
                    <Title order={1}>Mode Trainer</Title>
                </AppShell.Header>
                <AppShell.Main>
                    <Stack align="center" justify="flex-start" h="100%">
                        <QuestionDisplay keySignature={keySignature} scaleId={scaleId}/>
                        <Score notes={notes} correct={correct}/>
                        <Keyboard addNote={addNote} disabled={complete}/>
                        <Group>
                            <Button onClick={skip} disabled={complete} variant='light'>Show Answer</Button>
                            <Button onClick={newQuestion} disabled={!complete}>New Question</Button>
                            <Button onClick={setConfigOpen.open}>Configure...</Button>
                        </Group>
                        <Drawer position='right' opened={configOpen} onClose={discardConfig} title="Configuration">
                            <Configuration
                                config={currentConfig}
                                setConfig={setCurrentConfig}
                                onSubmit={applyConfig}
                                onDiscard={discardConfig}
                            />
                        </Drawer>
                    </Stack>
                </AppShell.Main>
                <AppShell.Footer>
                    <Container>
                        <Text>Developed by thy646742</Text>
                    </Container>
                </AppShell.Footer>
            </AppShell>
        </MantineProvider>
    );
};

export default App;