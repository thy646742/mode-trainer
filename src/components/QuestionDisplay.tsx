import { Text } from '@mantine/core';
import { getScaleName } from '../utils/getScaleName';

type QuestionDisplayProps = {
    keySignature: Key,
    scaleId: number
}

function QuestionDisplay({ keySignature, scaleId }: QuestionDisplayProps) {
    return(
        <Text span size={'xl'}>
            {getScaleName(keySignature, scaleId)}
        </Text>
    );
}

export default QuestionDisplay;