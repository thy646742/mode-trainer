import { useState, useMemo } from 'react';
import { createTheme, MantineProvider, AppShell, Title, Container, Text, Stack, Button } from '@mantine/core';
import Score from './components/Score';
import Keyboard from './components/Keyboard';
import QuestionDisplay from './components/QuestionDisplay';
import { getScaleNotes } from './utils/getScaleNotes';
import '@mantine/core/styles.css';

const globalTheme = createTheme({
    primaryColor: 'violet'
});

function App() {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ keySignature, setKeySignature ] = useState<Key>('0');
    const [ scaleId, setScaleId ] = useState<number>(0);
    const [ correct, setCorrect ] = useState<boolean>(true);

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
        setCorrect(note.pitch == scaleNotes[noteIndex].pitch && note.accidental == scaleNotes[noteIndex]. accidental);
    };

    const newQuestion = () => {
        const keySignatures: Key[] = ['0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '-1', '-2', '-3', '-4', '-5', '-6', '-7'];
        setNotes([]);
        setCorrect(true);
        setKeySignature(keySignatures[Math.floor(Math.random() * 15)]);
        setScaleId(Math.floor(Math.random() * 7));
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
                        <Keyboard addNote={addNote}/>
                        <Button onClick={newQuestion}>New Question</Button>
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