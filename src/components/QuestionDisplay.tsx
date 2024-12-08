import { Text, Container } from '@mantine/core';
import { getScaleName } from '../utils/getScaleName';
import classes from './QuestionDisplay.module.css';

type QuestionDisplayProps = {
    keySignature: Key,
    scaleId: number
}

function QuestionDisplay({ keySignature, scaleId }: QuestionDisplayProps) {
    const [ dispKey, dispAccidental, dispScale ] = getScaleName(keySignature, scaleId);
    return(
        <Container className={classes.questionWrapper}>
            <Text span className={classes.question}>
                {dispKey}
                <Text span className={classes.accidental}>{dispAccidental}</Text>
                &nbsp;
                {dispScale}
            </Text>
        </Container>
    );
}

export default QuestionDisplay;