import { useState } from 'react';
import { createTheme, MantineProvider, AppShell, Title, Container, Text, Stack } from '@mantine/core';
import Score from './components/Score';
import Keyboard from './components/Keyboard';
import '@mantine/core/styles.css';

const globalTheme = createTheme({
    primaryColor: 'violet'
});

function App() {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ keySignature, setKeySignature ] = useState<string>('C');

    const addNote = (note: Note) => {
        setNotes(notes.concat(note));
    };

    return (
        <MantineProvider theme={globalTheme}>
            <AppShell header={{ height: 60 }}>
                <AppShell.Header>
                    <Title order={1}>Mode Trainer</Title>
                </AppShell.Header>
                <AppShell.Main>
                    <Stack align="center" justify="flex-start">
                        <Score notes={notes} keySignature={keySignature}/>
                        <button onClick={()=>{addNote({pitch: 'G', accidental: '#'});}}>Add G</button>
                        <button onClick={()=>{setKeySignature('B');}}>Change to B key</button>
                        <Keyboard/>
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