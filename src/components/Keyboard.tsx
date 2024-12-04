import { ReactNode } from 'react';
import { Grid, Button } from '@mantine/core';
import classes from './Keyboard.module.css';

function Keyboard() {
    const getButtons = () => {
        const buttons: ReactNode[] = [];
        const accidentals: string[] = ['##', '#', '', 'b', 'bb'];
        const pitches: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 7; j++) {
                buttons.push(
                    <Grid.Col span={1} h="50px">
                        <Button classNames={{ root: classes.keyboard_button_root }} variant="outline">
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