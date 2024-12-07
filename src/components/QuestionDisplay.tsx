import { Text } from '@mantine/core';
import { getScaleNotes } from '../utils/getScaleNotes';
import { getScaleName } from '../utils/getScaleName';

type QuestionDisplayProps = {
    keySignature: Key,
    scaleId: number
}

function QuestionDisplay({ keySignature, scaleId }: QuestionDisplayProps) {
    console.log(getScaleNotes(keySignature, scaleId));
    return(
        <Text span size={'xl'}>
            {getScaleName(keySignature, scaleId)}
        </Text>
    );
}

export default QuestionDisplay;