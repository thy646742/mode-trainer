import { useState } from 'react';
import { createTheme, MantineProvider, AppShell, Title, Container, Text, Stack, Button } from '@mantine/core';
import Score from './components/Score';
import Keyboard from './components/Keyboard';
import QuestionDisplay from './components/QuestionDisplay';
import '@mantine/core/styles.css';

const globalTheme = createTheme({
    primaryColor: 'violet'
});

function App() {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ keySignature, setKeySignature ] = useState<Key>('0');
    const [ scaleId, setScaleId ] = useState<number>(0);

    const addNote = (note: Note) => {
        setNotes(notes.concat(note));
        console.log('Adding Note', note);
    };

    const newQuestion = () => {
        setNotes([]);
        const newScaleId: number = Math.floor(Math.random() * 7);
        setScaleId(newScaleId);
        const keySignatures: Key[] = ['0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '-1', '-2', '-3', '-4', '-5', '-6', '-7'];
        const newKeySignature: Key = keySignatures[Math.floor(Math.random() * 15)];
        setKeySignature(newKeySignature);
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
                        <Score notes={notes}/>
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