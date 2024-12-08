import { Text } from '@mantine/core';
import { getScaleName } from '../utils/getScaleName';
import classes from './QuestionDisplay.module.css';

type QuestionDisplayProps = {
    keySignature: Key,
    scaleId: number
}

function QuestionDisplay({ keySignature, scaleId }: QuestionDisplayProps) {
    const [ dispKey, dispAccidental, dispScale ] = getScaleName(keySignature, scaleId);
    return(
        <Text span size={'xl'}>
            {dispKey}
            <Text span className={classes.accidental}>{dispAccidental}</Text>
            &nbsp;
            {dispScale}
        </Text>
    );
}

export default QuestionDisplay;