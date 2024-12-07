import { Button } from '@mantine/core';
import { useState } from 'react';

type KeybaordProps = {
    addNote: (note: Note) => void
};

function Keyboard({ addNote }: KeybaordProps) {
    const [ pitch, setPitch ] = useState<string>('');
    return (
        <>
            <Button.Group>
                {
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(value => 
                        <Button
                            key={value}
                            variant={value == pitch ? 'filled' : 'outline'}
                            size='lg'
                            onClick={() => setPitch(value)}
                        >
                            {value}
                        </Button>
                    )
                }
            </Button.Group>
            <Button.Group>
                {
                    [
                        {internal: 'bb', display: '𝄫'},
                        {internal: 'b', display: '♭'},
                        {internal: '', display: '♮'},
                        {internal: '#', display: '♯'},
                        {internal: '##', display: '𝄪'},
                    ].map(value => 
                        <Button
                            key={value.internal}
                            variant='outline'
                            size='lg'
                            disabled={pitch == '' ? true : false}
                            onClick={() => {
                                addNote({
                                    pitch: pitch as Pitch,
                                    accidental: value.internal as Accidental,
                                    octave: null
                                });
                                setPitch('');
                            }}
                        >
                            {value.display}
                        </Button>
                    )
                }
            </Button.Group>
        </>
    );
};

export default Keyboard;