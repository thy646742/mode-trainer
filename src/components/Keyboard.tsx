import { ReactNode } from 'react';
import { Grid, Button } from '@mantine/core';
import classes from './Keyboard.module.css';

type KeybaordProps = {
    addNote: (note: Note) => void
};

function Keyboard({ addNote }: KeybaordProps) {
    const getButtons = () => {
        const buttons: ReactNode[] = [];
        const accidentals: Accidental[] = ['##', '#', '', 'b', 'bb'];
        const pitches: Pitch[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 7; j++) {
                buttons.push(
                    <Grid.Col span={1} h="50px" key={j * 10 + i}>
                        <Button
                            classNames={{ root: classes.keyboard_button_root }}
                            variant="outline"
                            onClick={ () => addNote({ pitch: pitches[j], accidental: accidentals[i], octave: null })}
                        >
                            {pitches[j] + accidentals[i]}
                        </Button>
                    </Grid.Col>
                );
            }
        }
        return buttons;
    };

    return (
        <Grid align="horizontal" columns={7} gutter={0} w="60%">
            {getButtons()}
        </Grid>
    );
};

export default Keyboard;