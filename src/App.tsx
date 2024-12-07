import { useState } from 'react';
import { createTheme, MantineProvider, AppShell, Title, Container, Text, Stack } from '@mantine/core';
import Score from './components/Score';
import Keyboard from './components/Keyboard';
import QuestionDisplay from './components/QuestionDisplay';
import '@mantine/core/styles.css';

const globalTheme = createTheme({
    primaryColor: 'violet'
});

function App() {
    const [ notes, setNotes ] = useState<Note[]>([]);

    const addNote = (note: Note) => {
        setNotes(notes.concat(note));
        console.log('Adding Note', note);
    };

    return (
        <MantineProvider theme={globalTheme}>
            <AppShell header={{ height: 60 }}>
                <AppShell.Header>
                    <Title order={1}>Mode Trainer</Title>
                </AppShell.Header>
                <AppShell.Main>
                    <Stack align="center" justify="flex-start" h="100%">
                        <QuestionDisplay keySignature={'+1'} scaleId={4}/>
                        <Score notes={notes}/>
                        <Keyboard addNote={addNote}/>
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