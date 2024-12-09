import { useEffect, useState, useRef } from 'react';
import { Text, Group, Stack, Collapse } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { getScaleName } from '../utils/getScaleName';
import classes from './QuestionDisplay.module.css';

type QuestionDisplayProps = {
    keySignature: Key,
    scaleId: number,
    timeMode: string,
    timeLimit: number,
    timeout: boolean,
    setTimeout: (timeout: boolean) => void
};

function QuestionDisplay({ keySignature, scaleId, timeMode, timeLimit, timeout, setTimeout }: QuestionDisplayProps) {
    const [ timer, setTimer ] = useState<number>(0);
    const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [ dispKey, dispAccidental, dispScale ] = getScaleName(keySignature, scaleId);

    const { t } = useTranslation();

    useEffect(() => {
        if(timeMode == 'timed' && timer == 0){
            setTimeout(true);
        }
    }, [timer]);

    useEffect(() => {
        console.log(timeout);
        if(timeout){
            clearInterval(tickerRef.current as number | undefined);
            return;
        }
        if(timeMode == 'timed'){
            setTimer(timeLimit);
            tickerRef.current = setInterval(() => setTimer(currTime => currTime - 1), 1000);
        }
        else if(timeMode == 'stopwatch'){
            setTimer(0);
            tickerRef.current = setInterval(() => setTimer(currTime => currTime + 1), 1000);
        }
        else{
            setTimer(0);
        }
        return () => {
            clearInterval(tickerRef.current as number | undefined);
        };
    }, [timeout, timeMode, timeLimit, keySignature, scaleId]);

    return(
        <Group className={classes.questionWrapper} gap='5rem'>
            <Text span className={classes.question}>
                {dispKey}
                <Text span className={classes.accidental}>{dispAccidental}</Text>
                &nbsp;
                {dispScale}
            </Text>
            <Collapse in={timeMode == 'untimed' ? false : true}>
                <Stack justify='flex-start' align='center' gap={0}>
                    <Text span className={classes.timeTitle}>
                        {timeMode == 'timed' ? t('question.timeremaining') : t('question.timeused')}
                    </Text>
                    <Text span className={classes.time}>
                        {timer}
                    </Text>
                </Stack>
            </Collapse>
        </Group>
    );
}

export default QuestionDisplay;