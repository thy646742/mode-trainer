import { Button, Group, Input, NumberInput, SegmentedControl, Stack, Space } from '@mantine/core';
import { useTranslation } from 'react-i18next';

type configurationProps = {
    config: Config,
    setConfig: (config: Config) => void,
    onSubmit: () => void,
    onDiscard: () => void
}

function Configuration({ config, setConfig, onSubmit, onDiscard }: configurationProps) {
    const { t } = useTranslation();

    const onTimeModeChange = (value: string) => {
        setConfig({
            ...config,
            timeMode: value
        });
    };

    const onTimeLimitChange = (value: number | string)=> {
        setConfig({
            ...config,
            timeLimit: value as number
        });
    };

    return (
        <Stack align='flex-start' justify='flex-start'>
            <Input.Wrapper label={t('config.timemode.label')}>
                <SegmentedControl
                    fullWidth
                    value={config.timeMode}
                    onChange={onTimeModeChange}
                    data={[
                        { label: t('config.timemode.untimed'), value: 'untimed'},
                        { label: t('config.timemode.timed'), value: 'timed'},
                        { label: t('config.timemode.stopwatch'), value: 'stopwatch'}
                    ]}/>
            </Input.Wrapper>
            <NumberInput
                label={t('config.timelimit.label')}
                suffix='s'
                allowNegative={false}
                allowDecimal={false}
                min={3}
                max={120}
                clampBehavior='blur'
                disabled={config.timeMode == 'timed' ? false : true}
                value={config.timeLimit}
                onChange={onTimeLimitChange}
            />
            <Space/>
            <Group>
                <Button variant='filled' onClick={onSubmit}>{t('config.save')}</Button>
                <Button variant='outline' onClick={onDiscard}>{t('config.discard')}</Button>
            </Group>
        </Stack>
    );
}

export default Configuration;